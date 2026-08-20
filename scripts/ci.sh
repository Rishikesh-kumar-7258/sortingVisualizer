#!/usr/bin/env bash
# CI entrypoint for this repo — the only thing Jenkinsfile knows to run.
# Exit code is pass/fail; scripts/run-tests.js additionally writes JUnit XML
# to test-results/*.xml so Jenkins reports real test counts, not just a
# single pass/fail blob.
set -euo pipefail
cd "$(dirname "$0")/.."

if ! command -v node >/dev/null 2>&1; then
  echo "node not found on this agent — cannot run CI checks" >&2
  exit 1
fi

echo "node $(node --version)"
node scripts/run-tests.js
