#!/usr/bin/env node
// CI test runner for sortingVisualizer. No npm dependencies (deliberately —
// this is a static HTML/CSS/JS project with no package.json/build step, and
// pulling in a package manager just to run CI would be a bigger change than
// the checks themselves). Three suites:
//   1. syntax          — `node --check` on every static/js/*.js file
//   2. asset-references — every local src/href in index.html resolves to a
//                          real file, so a typo can't silently 404 in prod
//   3. sorting-algorithms — the actual sort generator functions, extracted
//                          from static/js/index.js and exercised against
//                          edge-case + randomized arrays, must produce a
//                          correctly sorted array
//
// Writes JUnit XML to test-results/results.xml (the contract Jenkinsfile's
// junit() step reads) and exits non-zero if anything failed.

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const results = []; // { classname, name, pass, message }

function record(classname, name, pass, message) {
  results.push({ classname, name, pass, message: message || '' });
}

// ── Suite 1: syntax ──────────────────────────────────────────────
function jsFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...jsFiles(full));
    else if (entry.name.endsWith('.js')) out.push(full);
  }
  return out;
}

function runSyntaxSuite() {
  const files = jsFiles(path.join(ROOT, 'static', 'js'));
  for (const file of files) {
    const rel = path.relative(ROOT, file);
    try {
      execFileSync(process.execPath, ['--check', file], { stdio: 'pipe' });
      record('syntax', rel, true);
    } catch (e) {
      record('syntax', rel, false, (e.stderr || e.message).toString());
    }
  }
}

// ── Suite 2: asset references in index.html resolve to real files ──
function runAssetReferenceSuite() {
  const htmlPath = path.join(ROOT, 'index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');
  const attrRegex = /\b(?:src|href)=["']([^"']+)["']/g;
  const seen = new Set();
  let match;
  while ((match = attrRegex.exec(html))) {
    const ref = match[1];
    if (seen.has(ref)) continue;
    seen.add(ref);
    if (/^([a-z]+:)?\/\//i.test(ref) || ref.startsWith('data:') || ref.startsWith('#')) {
      continue; // external URL, data URI, or in-page anchor — not a local file
    }
    const resolved = path.join(ROOT, ref.split('#')[0].split('?')[0]);
    const exists = fs.existsSync(resolved);
    record('asset-references', ref, exists, exists ? '' : `referenced in index.html but not found at ${resolved}`);
  }
}

// ── Suite 3: sorting algorithm correctness ──────────────────────────
function extractGeneratorSource() {
  const jsPath = path.join(ROOT, 'static', 'js', 'index.js');
  const src = fs.readFileSync(jsPath, 'utf8');
  const startMarker = 'ALGORITHM GENERATORS';
  const endMarker = 'RENDERING';
  const markerIdx = src.indexOf(startMarker);
  const endIdx = src.indexOf(endMarker, markerIdx);
  if (markerIdx === -1 || endIdx === -1 || endIdx <= markerIdx) {
    throw new Error(
      `could not locate generator section between "${startMarker}" and "${endMarker}" markers in ${path.relative(ROOT, jsPath)} — did the file get restructured?`
    );
  }
  // Slice from the start of the marker's own line, not mid-comment, so the
  // extracted text doesn't begin with a dangling "ALGORITHM GENERATORS"
  // fragment that isn't valid JS on its own.
  const startIdx = src.lastIndexOf('\n', markerIdx) + 1;
  return src.slice(startIdx, endIdx);
}

// Deterministic PRNG (mulberry32) so randomized test arrays are stable across runs.
function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffled(arr, rand) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildTestArrays() {
  const rand = mulberry32(42);
  return [
    { label: 'empty', arr: [] },
    { label: 'single', arr: [7] },
    { label: 'two-elements', arr: [2, 1] },
    { label: 'already-sorted', arr: Array.from({ length: 20 }, (_, i) => i + 1) },
    { label: 'reversed', arr: Array.from({ length: 20 }, (_, i) => 20 - i) },
    { label: 'few-unique', arr: Array.from({ length: 30 }, () => 1 + Math.floor(rand() * 4)) },
    { label: 'random-50', arr: shuffled(Array.from({ length: 50 }, (_, i) => i + 1), rand) },
  ];
}

function drain(gen) {
  let r = gen.next();
  let guard = 0;
  while (!r.done) {
    if (++guard > 5_000_000) throw new Error('generator did not terminate (possible infinite loop)');
    r = gen.next();
  }
}

function runSortingAlgorithmSuite() {
  const genSource = extractGeneratorSource();
  const sandbox = {};
  vm.createContext(sandbox);
  try {
    vm.runInContext(genSource, sandbox, { filename: 'static/js/index.js (extracted generators)' });
  } catch (e) {
    record('sorting-algorithms', 'extract-and-load', false, `failed to load extracted generator source: ${e.message}`);
    return;
  }

  const ALGORITHMS = {
    'bubble-sort': sandbox.bubbleSortGen,
    'selection-sort': sandbox.selectionSortGen,
    'insertion-sort': sandbox.insertionSortGen,
    'merge-sort': sandbox.mergeSortGen,
    'quick-sort': sandbox.quickSortGen,
    'heap-sort': sandbox.heapSortGen,
    'shell-sort': sandbox.shellSortGen,
    'radix-sort-lsd': sandbox.radixSortGen,
    'cocktail-shaker-sort': sandbox.cocktailSortGen,
    'comb-sort': sandbox.combSortGen,
  };

  const testArrays = buildTestArrays();

  for (const [algoName, genFn] of Object.entries(ALGORITHMS)) {
    if (typeof genFn !== 'function') {
      record('sorting-algorithms', `${algoName}: defined`, false, `${algoName} generator not found after extraction`);
      continue;
    }
    for (const { label, arr } of testArrays) {
      const testName = `${algoName}: ${label} (n=${arr.length})`;
      const working = arr.slice();
      const expected = arr.slice().sort((a, b) => a - b);
      try {
        drain(genFn(working));
      } catch (e) {
        record('sorting-algorithms', testName, false, `threw: ${e.message}`);
        continue;
      }
      const sameLength = working.length === expected.length;
      const sameOrder = sameLength && working.every((v, i) => v === expected[i]);
      record(
        'sorting-algorithms',
        testName,
        sameOrder,
        sameOrder ? '' : `expected [${expected.join(',')}] but got [${working.join(',')}]`
      );
    }
  }
}

// ── JUnit XML output ────────────────────────────────────────────────
function xmlEscape(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function writeJUnitReport(destPath) {
  const total = results.length;
  const failures = results.filter((r) => !r.pass).length;
  const cases = results
    .map((r) => {
      const open = `    <testcase classname="${xmlEscape(r.classname)}" name="${xmlEscape(r.name)}">`;
      if (r.pass) return `${open}</testcase>`;
      return `${open}\n      <failure message="${xmlEscape(r.message)}"/>\n    </testcase>`;
    })
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<testsuites>
  <testsuite name="sortingVisualizer-ci" tests="${total}" failures="${failures}">
${cases}
  </testsuite>
</testsuites>
`;
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, xml);
}

// ── Main ─────────────────────────────────────────────────────────────
runSyntaxSuite();
runAssetReferenceSuite();
runSortingAlgorithmSuite();

writeJUnitReport(path.join(ROOT, 'test-results', 'results.xml'));

const failed = results.filter((r) => !r.pass);
for (const r of results) {
  console.log(`${r.pass ? 'PASS' : 'FAIL'}  [${r.classname}] ${r.name}${r.pass ? '' : ` — ${r.message}`}`);
}
console.log(`\n${results.length - failed.length}/${results.length} passed`);

if (failed.length > 0) process.exit(1);
