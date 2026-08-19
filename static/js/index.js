// ─────────────────────────────────────────────
//  THEMES
// ─────────────────────────────────────────────
const THEMES = {
  midnight: {
    '--bg':           '#080812',
    '--surface':      '#10102a',
    '--surface2':     '#1a1a38',
    '--border':       '#252550',
    '--text':         '#e2e8f0',
    '--text-muted':   '#8892a8',
    '--bar':          '#6366f1',
    '--bar-compare':  '#f59e0b',
    '--bar-write':    '#ec4899',
    '--bar-pivot':    '#ef4444',
    '--bar-sorted':   '#10b981',
    '--accent':       '#6366f1',
    '--logo-bg':      '#6366f1',
  },
  ocean: {
    '--bg':           '#020e1e',
    '--surface':      '#081830',
    '--surface2':     '#0d2040',
    '--border':       '#123060',
    '--text':         '#c8e8ff',
    '--text-muted':   '#6090b8',
    '--bar':          '#0ea5e9',
    '--bar-compare':  '#fbbf24',
    '--bar-write':    '#8b5cf6',
    '--bar-pivot':    '#f43f5e',
    '--bar-sorted':   '#06d6a0',
    '--accent':       '#0ea5e9',
    '--logo-bg':      '#0ea5e9',
  },
  neon: {
    '--bg':           '#04030a',
    '--surface':      '#08060f',
    '--surface2':     '#0e0c18',
    '--border':       '#200840',
    '--text':         '#f0e0ff',
    '--text-muted':   '#8060a8',
    '--bar':          '#a855f7',
    '--bar-compare':  '#00e5ff',
    '--bar-write':    '#ff00e5',
    '--bar-pivot':    '#ff2244',
    '--bar-sorted':   '#00ff88',
    '--accent':       '#a855f7',
    '--logo-bg':      '#a855f7',
  },
  sunset: {
    '--bg':           '#120600',
    '--surface':      '#1e0c00',
    '--surface2':     '#2e1400',
    '--border':       '#4a2400',
    '--text':         '#fff0e0',
    '--text-muted':   '#b08060',
    '--bar':          '#f97316',
    '--bar-compare':  '#facc15',
    '--bar-write':    '#e879f9',
    '--bar-pivot':    '#ef4444',
    '--bar-sorted':   '#84cc16',
    '--accent':       '#f97316',
    '--logo-bg':      '#f97316',
  },
  forest: {
    '--bg':           '#020e04',
    '--surface':      '#061408',
    '--surface2':     '#0a1e0c',
    '--border':       '#143018',
    '--text':         '#d0f0d8',
    '--text-muted':   '#6a9870',
    '--bar':          '#22c55e',
    '--bar-compare':  '#fbbf24',
    '--bar-write':    '#60a5fa',
    '--bar-pivot':    '#f43f5e',
    '--bar-sorted':   '#a3e635',
    '--accent':       '#22c55e',
    '--logo-bg':      '#22c55e',
  },
  light: {
    '--bg':           '#f0f4f8',
    '--surface':      '#ffffff',
    '--surface2':     '#f1f5f9',
    '--border':       '#cbd5e1',
    '--text':         '#0f172a',
    '--text-muted':   '#64748b',
    '--bar':          '#6366f1',
    '--bar-compare':  '#f59e0b',
    '--bar-write':    '#ec4899',
    '--bar-pivot':    '#ef4444',
    '--bar-sorted':   '#10b981',
    '--accent':       '#6366f1',
    '--logo-bg':      '#6366f1',
  },
};

// ─────────────────────────────────────────────
//  ALGORITHM METADATA
// ─────────────────────────────────────────────
const ALGO_INFO = {
  bubble:    { name: 'Bubble Sort',          desc: 'Repeatedly compares adjacent elements and swaps if out of order. Simple but inefficient on large datasets.',                                          best: 'O(n)',        avg: 'O(n²)',       worst: 'O(n²)',       space: 'O(1)',      stable: 'Yes' },
  selection: { name: 'Selection Sort',       desc: 'Finds the minimum in the unsorted portion each pass and places it at the front.',                                                                    best: 'O(n²)',       avg: 'O(n²)',       worst: 'O(n²)',       space: 'O(1)',      stable: 'No'  },
  insertion: { name: 'Insertion Sort',       desc: 'Builds the sorted array one element at a time by inserting each into its correct position.',                                                         best: 'O(n)',        avg: 'O(n²)',       worst: 'O(n²)',       space: 'O(1)',      stable: 'Yes' },
  merge:     { name: 'Merge Sort',           desc: 'Divide-and-conquer: splits, recursively sorts, then merges. Guarantees O(n log n) at all times.',                                                    best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)',      stable: 'Yes' },
  quick:     { name: 'Quick Sort',           desc: 'Picks a pivot, partitions around it, then recursively sorts each partition. Excellent average-case performance.',                                    best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n²)',       space: 'O(log n)', stable: 'No'  },
  heap:      { name: 'Heap Sort',            desc: 'Builds a max-heap and repeatedly extracts the maximum to sort in place. Consistent O(n log n) with no extra space.',                                 best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(1)',      stable: 'No'  },
  shell:     { name: 'Shell Sort',           desc: 'Generalization of insertion sort that compares elements far apart first, gradually decreasing the gap for efficiency.',                               best: 'O(n log n)', avg: 'O(n log² n)', worst: 'O(n²)',       space: 'O(1)',      stable: 'No'  },
  radix:     { name: 'Radix Sort (LSD)',     desc: 'Non-comparison sort processing digits from least to most significant using counting sort as a subroutine.',                                           best: 'O(nk)',       avg: 'O(nk)',       worst: 'O(nk)',       space: 'O(n+k)',    stable: 'Yes' },
  cocktail:  { name: 'Cocktail Shaker Sort', desc: 'Bidirectional bubble sort — passes alternately from left to right and right to left, reducing unsorted bounds each pass.',                            best: 'O(n)',        avg: 'O(n²)',       worst: 'O(n²)',       space: 'O(1)',      stable: 'Yes' },
  comb:      { name: 'Comb Sort',            desc: 'Improvement over bubble sort that eliminates small values near the end (turtles) by using a gap larger than 1 initially.',                           best: 'O(n log n)', avg: 'O(n²/2^p)',  worst: 'O(n²)',       space: 'O(1)',      stable: 'No'  },
};

// ─────────────────────────────────────────────
//  STATE
// ─────────────────────────────────────────────
const state = {
  array:        [],
  size:         50,
  speedVal:     50,
  algorithm:    'bubble',
  theme:        'midnight',
  arrayType:    'random',
  sorting:      false,
  paused:       false,
  animInterval: null,
  timerInterval:null,
  generator:    null,
  comparisons:  0,
  writes:       0,
  startTime:    null,
  prevHL:       [],        // indices highlighted last step
  sortedSet:    new Set(),
  stepsPerTick: 1,
  intervalMs:   50,
  soundEnabled: true,
  volume:       0.5,
};

// ─────────────────────────────────────────────
//  SETTINGS PERSISTENCE (sessionStorage)
// ─────────────────────────────────────────────
const SETTINGS_KEY = 'sortingVisualizer.settings';

function saveSettings() {
  const settings = {
    algorithm:    state.algorithm,
    size:         state.size,
    speedVal:     state.speedVal,
    arrayType:    state.arrayType,
    theme:        state.theme,
    soundEnabled: state.soundEnabled,
    volume:       state.volume,
  };
  sessionStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

function loadSettings() {
  try {
    const raw = sessionStorage.getItem(SETTINGS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────
//  ARRAY GENERATORS
// ─────────────────────────────────────────────
function makeArray(size, type) {
  let arr = Array.from({ length: size }, (_, i) => i + 1);

  switch (type) {
    case 'random': {
      for (let i = size - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      break;
    }
    case 'nearly_sorted': {
      const swapCount = Math.max(1, Math.floor(size * 0.08));
      for (let i = 0; i < swapCount; i++) {
        const a = Math.floor(Math.random() * size);
        const b = Math.floor(Math.random() * size);
        [arr[a], arr[b]] = [arr[b], arr[a]];
      }
      break;
    }
    case 'reversed':
      arr.reverse();
      break;
    case 'few_unique': {
      const unique = Math.max(2, Math.floor(size * 0.08));
      arr = Array.from({ length: size }, () => Math.floor(Math.random() * unique) + 1);
      break;
    }
    case 'sorted':
      break;
    case 'mountain': {
      const mid = Math.floor(size / 2);
      for (let i = 0; i < size; i++) {
        arr[i] = i <= mid ? i + 1 : size - i;
      }
      break;
    }
    case 'valley': {
      const mid2 = Math.floor(size / 2);
      for (let i = 0; i < size; i++) {
        arr[i] = i <= mid2 ? size - i : i - mid2 + 1;
      }
      break;
    }
  }
  return arr;
}

// ─────────────────────────────────────────────
//  ALGORITHM GENERATORS
//  Generators mutate their own array copy and yield step objects.
//  processStep() applies the same operations to state.array to keep them in sync.
//
//  Step types:
//    { type: 'compare', a, b }        – compare indices a and b
//    { type: 'swap',    a, b }        – swap values at a and b
//    { type: 'set',     index, value }– write value to index
//    { type: 'pivot',   index }       – mark a pivot element
//    { type: 'sorted',  indices }     – mark indices as fully sorted
//    { type: 'done' }                 – all sorted, animation ends
// ─────────────────────────────────────────────

function* bubbleSortGen(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      yield { type: 'compare', a: j, b: j + 1 };
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
        yield { type: 'swap', a: j, b: j + 1 };
      }
    }
    yield { type: 'sorted', indices: [n - i - 1] };
    if (!swapped) break;
  }
  yield { type: 'done' };
}

function* selectionSortGen(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    yield { type: 'pivot', index: i };
    for (let j = i + 1; j < n; j++) {
      yield { type: 'compare', a: minIdx, b: j };
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      yield { type: 'swap', a: i, b: minIdx };
    }
    yield { type: 'sorted', indices: [i] };
  }
  yield { type: 'done' };
}

function* insertionSortGen(arr) {
  const n = arr.length;
  yield { type: 'sorted', indices: [0] };
  for (let i = 1; i < n; i++) {
    let j = i;
    while (j > 0) {
      yield { type: 'compare', a: j - 1, b: j };
      if (arr[j] < arr[j - 1]) {
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
        yield { type: 'swap', a: j - 1, b: j };
        j--;
      } else {
        break;
      }
    }
    yield { type: 'sorted', indices: [i] };
  }
  yield { type: 'done' };
}

function* mergeSortGen(arr) {
  const n = arr.length;
  for (let size = 1; size < n; size *= 2) {
    for (let left = 0; left < n; left += size * 2) {
      const mid   = Math.min(left + size - 1, n - 1);
      const right = Math.min(left + size * 2 - 1, n - 1);
      if (mid >= right) continue;

      const L = arr.slice(left, mid + 1);
      const R = arr.slice(mid + 1, right + 1);
      let li = 0, ri = 0, k = left;

      while (li < L.length && ri < R.length) {
        yield { type: 'compare', a: left + li, b: mid + 1 + ri };
        const val = L[li] <= R[ri] ? L[li++] : R[ri++];
        arr[k] = val;
        yield { type: 'set', index: k++, value: val };
      }
      while (li < L.length) { arr[k] = L[li]; yield { type: 'set', index: k++, value: L[li++] }; }
      while (ri < R.length) { arr[k] = R[ri]; yield { type: 'set', index: k++, value: R[ri++] }; }
    }
  }
  yield { type: 'done' };
}

function* quickSortGen(arr) {
  const stack = [[0, arr.length - 1]];
  while (stack.length > 0) {
    const [low, high] = stack.pop();
    if (low >= high) {
      if (low === high) yield { type: 'sorted', indices: [low] };
      continue;
    }
    // Median-of-three pivot
    const m = Math.floor((low + high) / 2);
    if (arr[m] < arr[low])  { [arr[m],  arr[low]]  = [arr[low],  arr[m]];  yield { type: 'swap', a: m,  b: low  }; }
    if (arr[high] < arr[low]){ [arr[high],arr[low]] = [arr[low], arr[high]];yield { type: 'swap', a: high,b: low  }; }
    if (arr[m] < arr[high]) { [arr[m],  arr[high]] = [arr[high],arr[m]];   yield { type: 'swap', a: m,  b: high }; }

    const pivot = arr[high];
    yield { type: 'pivot', index: high };
    let i = low - 1;
    for (let j = low; j < high; j++) {
      yield { type: 'compare', a: j, b: high };
      if (arr[j] <= pivot) {
        i++;
        if (i !== j) { [arr[i], arr[j]] = [arr[j], arr[i]]; yield { type: 'swap', a: i, b: j }; }
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    yield { type: 'swap', a: i + 1, b: high };
    yield { type: 'sorted', indices: [i + 1] };
    if (low  <= i)     stack.push([low,  i]);
    if (i + 2 <= high) stack.push([i + 2, high]);
  }
  yield { type: 'done' };
}

function* heapSortGen(arr) {
  const n = arr.length;
  // Build max-heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    yield* heapifyGen(arr, n, i);
  }
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    yield { type: 'swap', a: 0, b: i };
    yield { type: 'sorted', indices: [i] };
    yield* heapifyGen(arr, i, 0);
  }
  yield { type: 'sorted', indices: [0] };
  yield { type: 'done' };
}

function* heapifyGen(arr, n, i) {
  let largest = i;
  const l = 2 * i + 1, r = 2 * i + 2;
  if (l < n) { yield { type: 'compare', a: l, b: largest }; if (arr[l] > arr[largest]) largest = l; }
  if (r < n) { yield { type: 'compare', a: r, b: largest }; if (arr[r] > arr[largest]) largest = r; }
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    yield { type: 'swap', a: i, b: largest };
    yield* heapifyGen(arr, n, largest);
  }
}

function* shellSortGen(arr) {
  const n = arr.length;
  let gap = Math.floor(n / 2);
  while (gap > 0) {
    for (let i = gap; i < n; i++) {
      let j = i;
      while (j >= gap) {
        yield { type: 'compare', a: j - gap, b: j };
        if (arr[j] < arr[j - gap]) {
          [arr[j], arr[j - gap]] = [arr[j - gap], arr[j]];
          yield { type: 'swap', a: j - gap, b: j };
          j -= gap;
        } else {
          break;
        }
      }
    }
    gap = Math.floor(gap / 2);
  }
  yield { type: 'done' };
}

function* radixSortGen(arr) {
  const n = arr.length;
  const max = Math.max(...arr);
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    const output = new Array(n).fill(0);
    const count  = new Array(10).fill(0);
    for (let i = 0; i < n; i++) { count[Math.floor(arr[i] / exp) % 10]++; yield { type: 'compare', a: i, b: i }; }
    for (let i = 1; i < 10; i++) count[i] += count[i - 1];
    for (let i = n - 1; i >= 0; i--) {
      const d = Math.floor(arr[i] / exp) % 10;
      output[--count[d]] = arr[i];
    }
    for (let i = 0; i < n; i++) { arr[i] = output[i]; yield { type: 'set', index: i, value: arr[i] }; }
  }
  yield { type: 'done' };
}

function* cocktailSortGen(arr) {
  const n = arr.length;
  let start = 0, end = n - 1;
  while (start < end) {
    let swapped = false;
    for (let i = start; i < end; i++) {
      yield { type: 'compare', a: i, b: i + 1 };
      if (arr[i] > arr[i + 1]) { [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]; swapped = true; yield { type: 'swap', a: i, b: i + 1 }; }
    }
    yield { type: 'sorted', indices: [end] };
    end--;
    if (!swapped) break;
    swapped = false;
    for (let i = end; i > start; i--) {
      yield { type: 'compare', a: i - 1, b: i };
      if (arr[i - 1] > arr[i]) { [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]]; swapped = true; yield { type: 'swap', a: i - 1, b: i }; }
    }
    yield { type: 'sorted', indices: [start] };
    start++;
    if (!swapped) break;
  }
  yield { type: 'done' };
}

function* combSortGen(arr) {
  const n = arr.length;
  let gap = n, shrink = 1.3, sorted = false;
  while (!sorted) {
    gap = Math.floor(gap / shrink);
    if (gap <= 1) { gap = 1; sorted = true; }
    for (let i = 0; i + gap < n; i++) {
      yield { type: 'compare', a: i, b: i + gap };
      if (arr[i] > arr[i + gap]) {
        [arr[i], arr[i + gap]] = [arr[i + gap], arr[i]];
        sorted = false;
        yield { type: 'swap', a: i, b: i + gap };
      }
    }
  }
  yield { type: 'done' };
}

// ─────────────────────────────────────────────
//  RENDERING
// ─────────────────────────────────────────────
function applyTheme(name) {
  const t = THEMES[name] || THEMES.midnight;
  const root = document.documentElement;
  Object.entries(t).forEach(([k, v]) => root.style.setProperty(k, v));
}

function getBarColor(index) {
  if (state.sortedSet.has(index)) return 'var(--bar-sorted)';
  const hl = state.highlights && state.highlights[index];
  if (hl === 'compare') return 'var(--bar-compare)';
  if (hl === 'write')   return 'var(--bar-write)';
  if (hl === 'pivot')   return 'var(--bar-pivot)';
  return 'var(--bar)';
}

function getBarGlow(index) {
  const hl = state.highlights && state.highlights[index];
  if (hl === 'compare') return '0 0 8px 0 var(--bar-compare)';
  if (hl === 'write')   return '0 0 10px 1px var(--bar-write)';
  if (hl === 'pivot')   return '0 0 10px 1px var(--bar-pivot)';
  return 'none';
}

function renderBars() {
  const container = document.getElementById('bar-area');
  if (!container) return;
  const w = container.clientWidth || 800;
  const n = state.array.length;
  const barW = Math.max(1, Math.floor(w / n) - (n > 100 ? 0 : 1));
  const maxVal = Math.max(...state.array, 1);

  container.innerHTML = '';
  state.array.forEach((val, i) => {
    const bar = document.createElement('div');
    bar.id = `b${i}`;
    bar.className = 'bar-elem';
    bar.style.width      = `${barW}px`;
    bar.style.height     = `${(val / maxVal) * 100}%`;
    bar.style.minHeight  = '2px';
    bar.style.backgroundColor = getBarColor(i);
    bar.style.boxShadow = getBarGlow(i);
    if (n <= 80) bar.style.borderRadius = '2px 2px 0 0';
    container.appendChild(bar);
  });
}

function updateBar(index, pop) {
  const bar = document.getElementById(`b${index}`);
  if (!bar) return;
  const maxVal = Math.max(...state.array, 1);
  bar.style.height = `${(state.array[index] / maxVal) * 100}%`;
  bar.style.backgroundColor = getBarColor(index);
  bar.style.boxShadow = getBarGlow(index);
  if (pop) {
    bar.classList.remove('bar-pop');
    void bar.offsetWidth; // restart animation
    bar.classList.add('bar-pop');
  }
}

// ─────────────────────────────────────────────
//  SOUND ENGINE
// ─────────────────────────────────────────────
let audioCtx = null;
let lastToneAt = 0;
const MIN_TONE_GAP_MS = 12; // caps concurrent oscillators at very high sort speeds

function getAudioCtx() {
  if (!audioCtx) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    audioCtx = new Ctx();
  }
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

function valueToFreq(value, minFreq = 140, maxFreq = 1000) {
  const maxVal = Math.max(...state.array, 1);
  const ratio = Math.max(0, Math.min(1, value / maxVal));
  return minFreq + ratio * (maxFreq - minFreq);
}

function playTone(freq, { duration = 0.06, type = 'sine', gain = 0.2 } = {}) {
  if (!state.soundEnabled || state.volume <= 0) return;
  const ctx = getAudioCtx();
  if (!ctx) return;

  const now = performance.now();
  if (now - lastToneAt < MIN_TONE_GAP_MS) return;
  lastToneAt = now;

  const t0 = ctx.currentTime;
  const osc  = ctx.createOscillator();
  const amp  = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  const peak = gain * state.volume;
  amp.gain.setValueAtTime(0, t0);
  amp.gain.linearRampToValueAtTime(peak, t0 + 0.005);
  amp.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  osc.connect(amp).connect(ctx.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.02);
}

function playCompareSound(a, b) {
  const v = (state.array[a] + state.array[b]) / 2;
  playTone(valueToFreq(v), { type: 'sine', duration: 0.05, gain: 0.16 });
}

function playWriteSound(index) {
  playTone(valueToFreq(state.array[index]), { type: 'triangle', duration: 0.07, gain: 0.22 });
}

// Melodic ascending chime played as the final "sorted" cascade sweeps across the bars.
function playCascadeNote(index) {
  if (!state.soundEnabled || state.volume <= 0) return;
  const ctx = getAudioCtx();
  if (!ctx) return;
  const t0 = ctx.currentTime;
  const freq = valueToFreq(state.array[index], 220, 1400);
  const osc = ctx.createOscillator();
  const amp = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(freq, t0);
  const peak = 0.18 * state.volume;
  amp.gain.setValueAtTime(0, t0);
  amp.gain.linearRampToValueAtTime(peak, t0 + 0.01);
  amp.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.18);
  osc.connect(amp).connect(ctx.destination);
  osc.start(t0);
  osc.stop(t0 + 0.2);
}

function playCompleteChord() {
  if (!state.soundEnabled || state.volume <= 0) return;
  const ctx = getAudioCtx();
  if (!ctx) return;
  const t0 = ctx.currentTime;
  [523.25, 659.25, 783.99].forEach((freq, i) => { // C5, E5, G5
    const osc = ctx.createOscillator();
    const amp = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t0);
    const peak = 0.2 * state.volume;
    amp.gain.setValueAtTime(0, t0 + i * 0.03);
    amp.gain.linearRampToValueAtTime(peak, t0 + i * 0.03 + 0.02);
    amp.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.6);
    osc.connect(amp).connect(ctx.destination);
    osc.start(t0 + i * 0.03);
    osc.stop(t0 + 0.65);
  });
}

// ─────────────────────────────────────────────
//  ANIMATION ENGINE
// ─────────────────────────────────────────────
// Maps to [index]: 'compare' | 'write' | 'pivot'
let highlights = {};

function clearHighlights() {
  for (const idx of state.prevHL) {
    if (!state.sortedSet.has(idx)) {
      delete highlights[idx];
      updateBar(idx);
    }
  }
  state.prevHL = [];
}

function processStep(step) {
  clearHighlights();

  switch (step.type) {
    case 'compare': {
      state.comparisons++;
      playCompareSound(step.a, step.b);
      highlights[step.a] = 'compare';
      highlights[step.b] = 'compare';
      state.prevHL = [step.a, step.b];
      updateBar(step.a);
      updateBar(step.b);
      break;
    }
    case 'swap': {
      state.writes += 2;
      [state.array[step.a], state.array[step.b]] = [state.array[step.b], state.array[step.a]];
      playWriteSound(step.a);
      highlights[step.a] = 'write';
      highlights[step.b] = 'write';
      state.prevHL = [step.a, step.b];
      updateBar(step.a, true);
      updateBar(step.b, true);
      break;
    }
    case 'set': {
      state.writes++;
      state.array[step.index] = step.value;
      playWriteSound(step.index);
      highlights[step.index] = 'write';
      state.prevHL = [step.index];
      updateBar(step.index, true);
      break;
    }
    case 'pivot': {
      highlights[step.index] = 'pivot';
      state.prevHL = [step.index];
      updateBar(step.index);
      break;
    }
    case 'sorted': {
      for (const idx of step.indices) {
        state.sortedSet.add(idx);
        delete highlights[idx];
        updateBar(idx);
      }
      break;
    }
    case 'done': {
      // Mark everything sorted with a cascade effect
      clearHighlights();
      const arr = state.array;
      const delay = Math.min(3, Math.floor(600 / arr.length));
      for (let i = 0; i < arr.length; i++) {
        setTimeout(() => {
          state.sortedSet.add(i);
          const bar = document.getElementById(`b${i}`);
          if (bar) {
            bar.style.backgroundColor = 'var(--bar-sorted)';
            bar.style.boxShadow = 'none';
            bar.classList.remove('bar-cascade');
            void bar.offsetWidth;
            bar.classList.add('bar-cascade');
          }
          playCascadeNote(i);
        }, i * delay);
      }
      setTimeout(playCompleteChord, arr.length * delay + 20);
      setTimeout(finishSorting, arr.length * delay + 100);
      return false;
    }
  }

  // Update stats display once per step (not every frame to avoid layout thrash)
  if ((state.comparisons + state.writes) % 20 === 0) updateStatsDisplay();

  return true;
}

function tick() {
  const steps = state.stepsPerTick;
  for (let s = 0; s < steps; s++) {
    const result = state.generator.next();
    if (result.done) { finishSorting(); return; }
    const cont = processStep(result.value);
    if (!cont) return;
  }
  updateStatsDisplay();
}

function finishSorting() {
  clearInterval(state.animInterval);
  clearInterval(state.timerInterval);
  state.animInterval  = null;
  state.timerInterval = null;
  state.sorting  = false;
  state.paused   = false;
  state.generator = null;
  updateStatsDisplay();
  updateButtons();
}

function computeAnimSpeed(speedVal) {
  if (speedVal <= 70) {
    // 1 → 800ms … 70 → 16ms  (exponential)
    const t = (speedVal - 1) / 69;
    const ms = Math.round(800 * Math.pow(16 / 800, t));
    return { intervalMs: Math.max(16, ms), stepsPerTick: ms < 16 ? Math.ceil(16 / ms) : 1 };
  }
  // 70 → 1 step/tick … 100 → ~500 steps/tick  (exponential)
  const steps = Math.round(Math.pow(500, (speedVal - 70) / 30));
  return { intervalMs: 16, stepsPerTick: Math.max(1, steps) };
}

function getSpeedLabel(speedVal) {
  if (speedVal <= 20)  return 'Slowest';
  if (speedVal <= 40)  return 'Slow';
  if (speedVal <= 60)  return 'Medium';
  if (speedVal <= 80)  return 'Fast';
  return 'Fastest';
}

function startSorting() {
  if (state.sorting && !state.paused) return;

  if (!state.sorting) {
    // Fresh start
    state.comparisons = 0;
    state.writes      = 0;
    highlights        = {};
    state.prevHL      = [];
    state.sortedSet   = new Set();
    state.startTime   = Date.now();

    const arr = [...state.array];
    const genMap = {
      bubble:    bubbleSortGen,
      selection: selectionSortGen,
      insertion: insertionSortGen,
      merge:     mergeSortGen,
      quick:     quickSortGen,
      heap:      heapSortGen,
      shell:     shellSortGen,
      radix:     radixSortGen,
      cocktail:  cocktailSortGen,
      comb:      combSortGen,
    };
    state.generator = (genMap[state.algorithm] || bubbleSortGen)(arr);

    state.timerInterval = setInterval(() => {
      if (!state.paused) {
        const s = ((Date.now() - state.startTime) / 1000).toFixed(1);
        document.getElementById('stat-time').textContent = `${s}s`;
      }
    }, 100);

    state.sorting = true;
  }

  state.paused = false;

  const { intervalMs, stepsPerTick } = computeAnimSpeed(state.speedVal);
  state.intervalMs   = intervalMs;
  state.stepsPerTick = stepsPerTick;

  clearInterval(state.animInterval);
  state.animInterval = setInterval(tick, intervalMs);
  updateButtons();
}

function pauseSorting() {
  if (!state.sorting || state.paused) return;
  clearInterval(state.animInterval);
  state.animInterval = null;
  state.paused = true;
  updateButtons();
}

function resetVisualizer() {
  clearInterval(state.animInterval);
  clearInterval(state.timerInterval);
  state.animInterval  = null;
  state.timerInterval = null;
  state.sorting   = false;
  state.paused    = false;
  state.generator = null;

  state.array       = makeArray(state.size, state.arrayType);
  highlights        = {};
  state.prevHL      = [];
  state.sortedSet   = new Set();
  state.comparisons = 0;
  state.writes      = 0;

  document.getElementById('stat-comparisons').textContent = '0';
  document.getElementById('stat-writes').textContent      = '0';
  document.getElementById('stat-time').textContent        = '0.0s';

  renderBars();
  updateButtons();
}

// ─────────────────────────────────────────────
//  UI STATE UPDATES
// ─────────────────────────────────────────────
function updateStatsDisplay() {
  document.getElementById('stat-comparisons').textContent = state.comparisons.toLocaleString();
  document.getElementById('stat-writes').textContent      = state.writes.toLocaleString();
}

function updateButtons() {
  const btnSort    = document.getElementById('btn-sort');
  const btnPause   = document.getElementById('btn-pause');
  const btnGenerate = document.getElementById('btn-generate');
  const btnCustom  = document.getElementById('btn-custom');

  if (state.sorting && !state.paused) {
    btnSort.textContent   = '▶ Sort';
    btnSort.disabled      = true;
    btnPause.disabled     = false;
    btnPause.textContent  = '⏸ Pause';
    btnGenerate.disabled  = true;
    btnCustom.disabled    = true;
    btnSort.classList.add('opacity-40', 'cursor-not-allowed');
    btnPause.classList.remove('opacity-40', 'cursor-not-allowed');
    btnGenerate.classList.add('opacity-40', 'cursor-not-allowed');
    btnCustom.classList.add('opacity-40', 'cursor-not-allowed');
  } else if (state.paused) {
    btnSort.textContent   = '▶ Resume';
    btnSort.disabled      = false;
    btnPause.disabled     = false;
    btnPause.textContent  = '⏸ Paused';
    btnSort.classList.remove('opacity-40', 'cursor-not-allowed');
    btnPause.classList.remove('opacity-40', 'cursor-not-allowed');
  } else {
    btnSort.textContent   = '▶ Sort';
    btnSort.disabled      = false;
    btnPause.disabled     = true;
    btnPause.textContent  = '⏸ Pause';
    btnGenerate.disabled  = false;
    btnCustom.disabled    = false;
    btnSort.classList.remove('opacity-40', 'cursor-not-allowed');
    btnPause.classList.add('opacity-40', 'cursor-not-allowed');
    btnGenerate.classList.remove('opacity-40', 'cursor-not-allowed');
    btnCustom.classList.remove('opacity-40', 'cursor-not-allowed');
  }
}

function updateAlgoInfo() {
  const info = ALGO_INFO[state.algorithm] || ALGO_INFO.bubble;
  document.getElementById('algo-name').textContent  = info.name;
  document.getElementById('algo-desc').textContent  = info.desc;
  document.getElementById('cx-best').textContent    = info.best;
  document.getElementById('cx-avg').textContent     = info.avg;
  document.getElementById('cx-worst').textContent   = info.worst;
  document.getElementById('cx-space').textContent   = info.space;
  document.getElementById('cx-stable').textContent  = info.stable;
}

// ─────────────────────────────────────────────
//  EVENT LISTENERS
// ─────────────────────────────────────────────
document.getElementById('algo-select').addEventListener('change', (e) => {
  state.algorithm = e.target.value;
  updateAlgoInfo();
  saveSettings();
  if (!state.sorting) resetVisualizer();
});

document.getElementById('size-slider').addEventListener('input', (e) => {
  state.size = parseInt(e.target.value);
  document.getElementById('size-label').textContent = state.size;
  saveSettings();
  if (!state.sorting) resetVisualizer();
});

document.getElementById('speed-slider').addEventListener('input', (e) => {
  state.speedVal = parseInt(e.target.value);
  document.getElementById('speed-label').textContent = getSpeedLabel(state.speedVal);
  saveSettings();
  // If actively sorting, adjust speed on-the-fly
  if (state.sorting && !state.paused) {
    const { intervalMs, stepsPerTick } = computeAnimSpeed(state.speedVal);
    state.intervalMs   = intervalMs;
    state.stepsPerTick = stepsPerTick;
    clearInterval(state.animInterval);
    state.animInterval = setInterval(tick, intervalMs);
  }
});

document.getElementById('array-type').addEventListener('change', (e) => {
  state.arrayType = e.target.value;
  saveSettings();
  if (!state.sorting) resetVisualizer();
});

document.getElementById('theme-select').addEventListener('change', (e) => {
  state.theme = e.target.value;
  applyTheme(state.theme);
  saveSettings();
  renderBars();
});

document.getElementById('volume-slider').addEventListener('input', (e) => {
  state.volume = parseInt(e.target.value) / 100;
  document.getElementById('volume-label').textContent = `${e.target.value}%`;
  saveSettings();
});

document.getElementById('btn-mute').addEventListener('click', () => {
  state.soundEnabled = !state.soundEnabled;
  updateMuteButton();
  saveSettings();
  if (state.soundEnabled) getAudioCtx(); // resume on user gesture
});

function updateMuteButton() {
  const btn = document.getElementById('btn-mute');
  btn.textContent = state.soundEnabled ? '🔊' : '🔇';
  btn.classList.toggle('muted', !state.soundEnabled);
}

document.getElementById('btn-generate').addEventListener('click', resetVisualizer);

document.getElementById('btn-sort').addEventListener('click', () => {
  if (state.paused) {
    startSorting();
  } else if (!state.sorting) {
    startSorting();
  }
});

document.getElementById('btn-pause').addEventListener('click', pauseSorting);

document.getElementById('btn-reset').addEventListener('click', () => {
  if (state.sorting) {
    resetVisualizer();
  } else {
    resetVisualizer();
  }
});

// Custom Input Modal
document.getElementById('btn-custom').addEventListener('click', () => {
  document.getElementById('modal').classList.remove('modal-hidden');
  document.getElementById('custom-textarea').focus();
});

document.getElementById('modal-backdrop').addEventListener('click', () => {
  document.getElementById('modal').classList.add('modal-hidden');
});

document.getElementById('modal-cancel').addEventListener('click', () => {
  document.getElementById('modal').classList.add('modal-hidden');
});

document.getElementById('modal-apply').addEventListener('click', () => {
  const input = document.getElementById('custom-textarea').value;
  const nums  = input.split(/[\s,;]+/).map(Number).filter(n => Number.isFinite(n) && n > 0);
  if (nums.length >= 2) {
    state.array   = nums.map(Math.round);
    state.size    = nums.length;
    document.getElementById('size-slider').value       = Math.min(200, state.size);
    document.getElementById('size-label').textContent  = state.size;
    highlights    = {};
    state.prevHL  = [];
    state.sortedSet = new Set();
    if (state.sorting) { clearInterval(state.animInterval); clearInterval(state.timerInterval); state.sorting = false; state.paused = false; }
    renderBars();
    updateButtons();
    document.getElementById('modal').classList.add('modal-hidden');
  } else {
    document.getElementById('custom-textarea').style.borderColor = 'var(--bar-pivot)';
    setTimeout(() => { document.getElementById('custom-textarea').style.borderColor = ''; }, 1500);
  }
});

document.getElementById('custom-textarea').addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && e.ctrlKey) document.getElementById('modal-apply').click();
  if (e.key === 'Escape') document.getElementById('modal').classList.add('modal-hidden');
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
  if (e.key === ' ' || e.key === 'Space') {
    e.preventDefault();
    if (state.sorting && !state.paused) pauseSorting();
    else startSorting();
  }
  if (e.key === 'r' || e.key === 'R') resetVisualizer();
  if (e.key === 'g' || e.key === 'G') resetVisualizer();
});

// Resize: re-render bars when container resizes
const resizeObserver = new ResizeObserver(() => renderBars());
resizeObserver.observe(document.getElementById('bar-area'));

// ─────────────────────────────────────────────
//  INIT
// ─────────────────────────────────────────────
(function restoreSettings() {
  const saved = loadSettings();
  if (!saved) return;
  if (saved.algorithm && ALGO_INFO[saved.algorithm]) state.algorithm = saved.algorithm;
  if (saved.theme && THEMES[saved.theme])            state.theme     = saved.theme;
  if (Number.isFinite(saved.size))                   state.size      = saved.size;
  if (Number.isFinite(saved.speedVal))                state.speedVal  = saved.speedVal;
  if (saved.arrayType)                                state.arrayType = saved.arrayType;
  if (typeof saved.soundEnabled === 'boolean')        state.soundEnabled = saved.soundEnabled;
  if (Number.isFinite(saved.volume))                  state.volume    = saved.volume;

  document.getElementById('algo-select').value  = state.algorithm;
  document.getElementById('theme-select').value = state.theme;
  document.getElementById('array-type').value   = state.arrayType;
  document.getElementById('size-slider').value  = state.size;
  document.getElementById('size-label').textContent = state.size;
  document.getElementById('speed-slider').value = state.speedVal;
  document.getElementById('volume-slider').value = Math.round(state.volume * 100);
  document.getElementById('volume-label').textContent = `${Math.round(state.volume * 100)}%`;
})();

applyTheme(state.theme);
state.array = makeArray(state.size, state.arrayType);
updateAlgoInfo();
updateButtons();
updateMuteButton();
renderBars();
document.getElementById('speed-label').textContent = getSpeedLabel(state.speedVal);
