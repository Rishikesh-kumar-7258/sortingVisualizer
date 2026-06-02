<div align="center">

# ⬡ Sorting Visualizer

**Watch algorithms think.** An interactive, real-time visualization of 10 classic sorting algorithms — built with zero dependencies, zero build steps, pure JavaScript.

[![JavaScript](https://img.shields.io/badge/JavaScript-ES2020-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-CDN-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![No Build Step](https://img.shields.io/badge/Build_Step-None-brightgreen?style=flat-square)](#getting-started)
[![License](https://img.shields.io/badge/License-MIT-purple?style=flat-square)](LICENSE)

<br/>

![Sorting Visualizer Demo](https://raw.githubusercontent.com/placeholder/demo.gif)

*Quick Sort on 80 elements — Neon theme*

</div>

---

## ✨ Highlights

<table>
<tr>
<td width="50%">

### 🧠 10 Algorithms
From O(n²) classics to O(n log n) powerhouses. Switch mid-session and watch the logic change.

</td>
<td width="50%">

### 🎨 6 Live Themes
Midnight · Ocean · Neon · Sunset · Forest · Light. Swaps instantly via CSS variables — no re-render.

</td>
</tr>
<tr>
<td width="50%">

### ⚡ Variable Speed Engine
Continuous slider from 800ms/step to 500 steps/frame. The algorithm doesn't restart — speed adjusts mid-sort.

</td>
<td width="50%">

### 📊 Real-time Stats
Comparisons, array writes, and elapsed time update live. Compare algorithm efficiency side by side.

</td>
</tr>
<tr>
<td width="50%">

### 🔢 7 Array Presets
Random · Nearly Sorted · Reversed · Few Unique · Already Sorted · Mountain · Valley. Each exposes different algorithm behaviors.

</td>
<td width="50%">

### ✍️ Custom Input
Paste your own numbers. See exactly how an algorithm handles your specific data.

</td>
</tr>
</table>

---

## 🚀 Getting Started

No install. No build. No config. Just serve a folder.

```bash
# Python (built into macOS and Linux)
python3 -m http.server 8080

# Node.js
npx serve .

# Or just open index.html directly in your browser
```

Then visit **http://localhost:8080** — that's it.

---

## 📐 Algorithms

| Algorithm | Best | Average | Worst | Space | Stable | Notes |
|:---|:---:|:---:|:---:|:---:|:---:|:---|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) | ✅ | Stops early if no swaps |
| Cocktail Shaker | O(n) | O(n²) | O(n²) | O(1) | ✅ | Bidirectional bubble sort |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) | ✅ | Fast on small/nearly-sorted data |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) | ❌ | Minimizes swaps |
| Shell Sort | O(n log n) | O(n log² n) | O(n²) | O(1) | ❌ | Gap-based insertion sort |
| Comb Sort | O(n log n) | O(n²/2ᵖ) | O(n²) | O(1) | ❌ | Bubble sort killer — eliminates turtles |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | ✅ | Guaranteed performance |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | ❌ | Median-of-three pivot |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) | ❌ | In-place, no extra memory |
| Radix Sort (LSD) | O(nk) | O(nk) | O(nk) | O(n+k) | ✅ | Non-comparison sort |

---

## 🎮 Controls

### Buttons

| Button | Action |
|:---|:---|
| **Generate** | Create a new array with current settings |
| **Custom Input** | Enter your own space- or comma-separated numbers |
| **▶ Sort** | Start (or resume after pause) |
| **⏸ Pause** | Freeze the animation mid-step |
| **↺ Reset** | Stop and regenerate the array |

### Keyboard Shortcuts

| Key | Action |
|:---:|:---|
| `Space` | Start / Resume sort |
| `R` | Reset array |
| `G` | Generate new array |

---

## 🎨 Color Language

Every color in the visualization means something:

| Color | Meaning |
|:---|:---|
| 🟣 **Theme accent** | Default, unsorted element |
| 🟡 **Amber / Cyan** | Currently being compared |
| 🩷 **Pink / Magenta** | Being swapped or written |
| 🔴 **Red** | Pivot element (Quick Sort) |
| 🟢 **Green** | Confirmed in its final sorted position |

---

## 🏗️ How It Works

The whole app is ~550 lines of plain JavaScript across two files. No framework, no transpiler.

### Generator-Based Animation

Each algorithm is a [JavaScript generator function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) that yields atomic step objects:

```js
function* bubbleSortGen(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      yield { type: 'compare', a: j, b: j + 1 };    // highlight two bars
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        yield { type: 'swap', a: j, b: j + 1 };      // update heights
      }
    }
    yield { type: 'sorted', indices: [arr.length - i - 1] }; // turn green
  }
}
```

A `setInterval` loop calls `generator.next()` one or more times per tick and applies each operation to the DOM. Pause is just `clearInterval`. Resume restarts the interval — the generator picks up exactly where it left off because **all algorithm state lives inside the generator**.

### CSS Variable Theming

All six themes are plain JavaScript objects. Switching themes is a single loop:

```js
Object.entries(theme).forEach(([key, value]) =>
  document.documentElement.style.setProperty(key, value)
);
```

Every bar, button, and surface reads its color from a CSS custom property like `var(--bar)` or `var(--bar-compare)`. No class toggling, no re-renders.

### Adaptive Speed

The speed slider maps exponentially to two parameters:

- **Slow end** (slider 1–70): `setInterval` delay shrinks from 800ms → 16ms, one step per tick
- **Fast end** (slider 71–100): interval locked at 16ms (~60fps), steps-per-tick grows from 1 → 500

This means "Fastest" mode can complete a 200-element bubble sort (up to 19,900 comparisons) in under a second without freezing the browser.

---

## 📁 Structure

```
sortingVisualizer/
├── index.html        # Layout, controls, modal — pure HTML + Tailwind classes
├── static/
│   ├── js/index.js   # Algorithms, animation engine, event handling (~550 lines)
│   └── css/index.css # CSS variables + component styles (~90 lines)
└── README.md
```

---

## 💡 Tips

- **Try "Reversed" array on Quick Sort** to see worst-case behavior avoided by the median-of-three pivot.
- **Try "Nearly Sorted" on Insertion Sort** to see O(n) best-case performance in action.
- **Try "Few Unique" on any algorithm** to see how duplicates affect performance.
- **Compare Merge Sort vs Heap Sort** on the same array — both are O(n log n) but with very different write patterns.
- At **Fastest** speed, algorithms are almost instant. Slow down to "Slow" or "Slowest" to follow the logic step by step.

---

<div align="center">

Made with 🖤 — no frameworks were harmed in the making of this project.

</div>
