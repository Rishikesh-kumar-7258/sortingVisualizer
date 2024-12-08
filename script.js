// FISHER-YATES SHUFFLE ALGORITHM
function Shuffle(arr) {
	for (let i = arr.length - 1; i >= 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));

		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
}

// TEMPLATE CLASS (SORTING ALGORITHMS)
class SortingAlgorithm {
	// VARIABLES
	#arr = [];
	#sortedArr = [];
	#time = 0;

	// CONSTRUCTOR
	constructor(arr) {
		this.arr = arr;
	}

	// GETTERS
	get arr() {
		return this.#arr;
	}

	get sortedArr() {
		return this.#sortedArr;
	}

	get time() {
		return this.#time;
	}

	// SETTERS

	set arr(arr) {
		this.#arr = arr;
	}

	set sortedArr(sortedArr) {
		this.#sortedArr = sortedArr;
	}

	set time(time) {
		this.#time = time;
	}

	// METHODS
	sort() {
		// OVERRIDE THIS METHOD
	}
}

// BUBBLE SORT CLASS
class BubbleSort extends SortingAlgorithm {
	constructor(arr) {
		super(arr);
	}

	sort() {
		const arr = this.arr.slice();
		const n = arr.length;

		const ans = [];

		let start = performance.now();
		for (let i = 0; i < n - 1; i++) {
			let swapped = false;
			for (let j = 0; j < n - i - 1; j++) {
				if (arr[j] > arr[j + 1]) {
					[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
					swapped = true;
				}

				ans.push({
					arr: arr.slice(),
					current: swapped ? j + 1 : j,
				});
			}

			if (!swapped) {
				break;
			}
		}
		ans.push({
			arr: arr.slice(),
		});
		let end = performance.now();

		this.sortedArr = arr;
		this.time = end - start;

		return ans;
	}
}

// SELECTION SORT CLASS
class SelectionSort extends SortingAlgorithm {
	constructor(arr) {
		super(arr);
	}

	sort() {
		const arr = this.arr.slice();
		const n = arr.length;

		const ans = [];

		let start = performance.now();
		for (let i = 0; i < n - 1; i++) {
			let minIndex = i;
			for (let j = i + 1; j < n; j++) {
				if (arr[minIndex] > arr[j]) {
					minIndex = j;
				}

				ans.push({
					arr: arr.slice(),
					current: j,
					minIndex: minIndex,
				});
			}

			[arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
		}
		ans.push({
			arr: arr.slice(),
		});
		let end = performance.now();

		this.sortedArr = arr;
		this.time = end - start;

		return ans;
	}
}

// INSERTION SORT
class InsertionSort extends SortingAlgorithm {
	constructor(arr) {
		super(arr);
	}

	sort() {
		const arr = this.arr.slice();
		const n = arr.length;

		const ans = [];

		let start = performance.now();
		let end = performance.now();

		this.sortedArr = arr;
		for (let i = 1; i < n; i++) {
			let j = i - 1;

			while (j >= 0 && arr[j] > arr[j + 1]) {
				[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
				j--;

				ans.push({
					arr: arr.slice(),
					current: j + 1,
				});
			}
		}

		ans.push({
			arr: arr.slice(),
		});

		this.time = end - start;

		return ans;
	}
}

// MERGE SORT
class MergeSort extends SortingAlgorithm {
	constructor(arr) {
		super(arr);
	}

	sort() {
		const arr = this.arr.slice();
		const n = arr.length;

		const ans = [];

		let start = performance.now();

		const merge = (arr, l, m, r) => {
			const n1 = m - l + 1;
			const n2 = r - m;

			const L = new Array(n1);
			const R = new Array(n2);

			for (let i = 0; i < n1; i++) {
				L[i] = arr[l + i];
			}

			for (let i = 0; i < n2; i++) {
				R[i] = arr[m + 1 + i];
			}

			let i = 0;
			let j = 0;
			let k = l;

			while (i < n1 && j < n2) {
				if (L[i] <= R[j]) {
					arr[k] = L[i];
					i++;
				} else {
					arr[k] = R[j];
					j++;
				}
				k++;

				ans.push({
					arr: arr.slice(),
					current: k,
					left: l,
					right: r,
				});
			}

			while (i < n1) {
				arr[k] = L[i];
				i++;
				k++;

				ans.push({
					arr: arr.slice(),
					current: k,
					left: l,
					right: r,
				});
			}

			while (j < n2) {
				arr[k] = R[j];
				j++;
				k++;

				ans.push({
					arr: arr.slice(),
					current: k,
					left: l,
					right: r,
				});
			}
		};

		const mergeSort = (arr, l, r) => {
			if (l >= r) {
				return;
			}

			const m = Math.floor((l + r) / 2);

			mergeSort(arr, l, m);
			mergeSort(arr, m + 1, r);

			merge(arr, l, m, r);
		};

		mergeSort(arr, 0, n - 1);

		ans.push({
			arr: arr.slice(),
		});

		let end = performance.now();

		this.sortedArr = arr;

		this.time = end - start;

		return ans;
	}
}

// QUICK SORT
class QuickSort extends SortingAlgorithm {
	constructor(arr) {
		super(arr);
	}

	sort() {
		const arr = this.arr.slice();
		const n = arr.length;

		const ans = [];

		let start = performance.now();

		const partition = (arr, low, high) => {
			const pivot = Math.floor(Math.random() * (high - low) + low);
			const pivotValue = arr[pivot];

			let currentPivot = pivot;

			let i = low - 1;
			let j = high + 1;

			while (true) {
				do {
					i++;
					ans.push({
						arr: arr.slice(),
						lIndex: i,
						rIndex: j,
						left: low,
						right: high,
						pivot: currentPivot,
					});
				} while (arr[i] < pivotValue);

				do {
					j--;
					ans.push({
						arr: arr.slice(),
						lIndex: i,
						rIndex: j,
						left: low,
						right: high,
						pivot: currentPivot,
					});
				} while (arr[j] > pivotValue);

				if (i >= j) {
					return j;
				}

				if (i === currentPivot) {
					currentPivot = j;
				}

				if (j === currentPivot) {
					currentPivot = i;
				}

				[arr[i], arr[j]] = [arr[j], arr[i]];
			}

			return j;
		};

		const quickSort = (arr, low, high) => {
			if (low < high) {
				const pi = partition(arr, low, high);

				quickSort(arr, low, pi);
				quickSort(arr, pi + 1, high);
			}
		};

		quickSort(arr, 0, n - 1);

		ans.push({
			arr: arr.slice(),
		});

		let end = performance.now();

		this.sortedArr = arr;
		this.time = end - start;

		return ans;
	}
}

// HEAP SORT
class HeapSort extends SortingAlgorithm {
	constructor(arr) {
		super(arr);
	}

	sort() {
		const arr = this.arr.slice();
		const n = arr.length;

		const ans = [];

		let start = performance.now();
		const makeHeap = (arr) => {
			for (let i = n / 2; i >= 0; i--) {
				heapify(arr, n, i);
			}
		};

		const heapify = (arr, size, i) => {
			let largest = i;
			let l = 2 * i + 1;
			let r = 2 * i + 2;

			if (l <= size && arr[l] > arr[largest]) {
				largest = l;
			}

			if (r <= size && arr[r] > arr[largest]) {
				largest = r;
			}

			if (largest !== i) {
				[arr[i], arr[largest]] = [arr[largest], arr[i]];
				ans.push({
					arr: arr.slice(),
					current: i,
					largest: largest,
				});
				heapify(arr, size, largest);
			}
		};

		makeHeap(arr);
		let size = n - 1;
		while (size >= 0) {
			[arr[0], arr[size]] = [arr[size], arr[0]];
			size--;

			ans.push({
				arr: arr.slice(),
				current: 0,
				left: 0,
				right: size,
			});

			heapify(arr, size, 0);
		}

		ans.push({
			arr: arr.slice(),
		});

		console.log(arr);

		let end = performance.now();

		this.sortedArr = arr;
		this.time = end - start;

		return ans;
	}
}

const ALGORITHMS = {
	"Bubble Sort": BubbleSort,
	"Selection Sort": SelectionSort,
	"Insertion Sort": InsertionSort,
	"Merge Sort": MergeSort,
	"Quick Sort": QuickSort,
	"Heap Sort": HeapSort,
};

const SPEED = {
	Fastest: 1,
	Faster: 10,
	Fast: 20,
	Medium: 50,
	Slow: 100,
	Slower: 200,
	Slowest: 500,
};

// ################## DOM MANIPULATION ##################
//  DOM ELEMENTS
const randSize = document.getElementById("randomNumbers");
const speed = document.getElementById("speed");
const algorithm = document.getElementById("algorithm");
const sortBtn = document.getElementById("startBtn");
const drawDiv = document.getElementById("drawDiv");
const canvas = document.getElementById("canvas");
canvas.width = drawDiv.clientWidth;
canvas.height = drawDiv.clientHeight;
const ctx = canvas.getContext("2d");
const stopBtn = document.getElementById("stopBtn");
const pauseBtn = document.getElementById("pauseBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

// VARIABLES
const arr = Array.from({ length: randSize.value }, (_, i) => i + 1);
Shuffle(arr);
var stop = false;
var globalResults = [];
var globalResultsIndex = -1;

//############# FUNCTIONS #############

// function to draw the bars
function draw(arr, options = {}) {
	const n = arr.length;
	const w = canvas.width / n;
	const h = canvas.height;
	const m = h / Math.max(...arr);

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for (let i = 0; i < n; i++) {
		ctx.fillStyle = "green";

		if (options.current === i || options.pivot === i) {
			ctx.fillStyle = "red";
		}

		if (options.minIndex === i || options.largest === i) {
			ctx.fillStyle = "blue";
		}

		if (options.lIndex === i || options.rIndex === i) {
			ctx.fillStyle = "orange";
		}

		ctx.fillRect(i * w, h - arr[i] * m, w - 2, arr[i] * m);
		ctx.stroke();
	}

	if (options.left !== undefined && options.right !== undefined) {
		ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
		ctx.fillRect(
			options.left * w,
			0,
			(options.right - options.left + 1) * w,
			h
		);
		ctx.stroke();
	}
}
draw(arr);

// function to enforce min and max values
function enforceMinMax(el) {
	if (parseInt(el.value) < parseInt(el.min)) {
		el.value = el.min;
	} else if (parseInt(el.value) > parseInt(el.max)) {
		el.value = el.max;
	}
}

// function to fill options in a select element
function fillOptions(el, options) {
	el.innerHTML = "";

	for (let option of options) {
		const opt = document.createElement("option");
		opt.value = option;
		opt.innerText = option;
		el.appendChild(opt);
	}
}
fillOptions(algorithm, Object.keys(ALGORITHMS).sort());
fillOptions(
	speed,
	Object.keys(SPEED).sort((a, b) => a < b)
);
speed.value = "Medium";

// function to restart the animation
function restart() {
	stop = true;
	globalResults = [];
	globalResultsIndex = -1;
	Shuffle(arr);
	draw(arr);

	stopBtn.classList.add("hide");
	sortBtn.classList.remove("hide");
	pauseBtn.classList.add("hide");
}

//############ EVENT LISTENERS #############

// changing array size
randSize.addEventListener("keyup", () => {
	arr.length = randSize.value;
	for (let i = 0; i < arr.length; i++) {
		arr[i] = i + 1;
	}
	Shuffle(arr);
	draw(arr);
});

// changing speed
speed.addEventListener("change", () => {
	clearInterval(animate);
	animate = setInterval(() => {
		if (stop) {
			return;
		}

		const ans = globalResults[++globalResultsIndex];
		if (ans === undefined) {
			stop = true;
			return;
		}

		draw(ans.arr, ans);
	}, SPEED[speed.value]);
});

// changing algorithm
algorithm.addEventListener("change", () => {
	restart();
});

// Stop button
pauseBtn.addEventListener("click", () => {
	stop = true;

	pauseBtn.classList.add("hide");
	sortBtn.classList.remove("hide");
});

// Start button
sortBtn.addEventListener("click", () => {
	if (globalResults.length === 0) {
		const algo = new ALGORITHMS[algorithm.value](arr);
		const ans = algo.sort();
		globalResults = ans;
	}

	stop = false;

	stopBtn.classList.remove("hide");
	pauseBtn.classList.remove("hide");
	sortBtn.classList.add("hide");
});

// Stop button
stopBtn.addEventListener("click", () => {
	restart();
});

// Next button
nextBtn.addEventListener("click", () => {
	if (globalResultsIndex < globalResults.length - 1 && stop) {
		draw(
			globalResults[++globalResultsIndex].arr,
			globalResults[globalResultsIndex]
		);
	}
});

// Previous button
prevBtn.addEventListener("click", () => {
	if (globalResultsIndex > 0 && stop) {
		draw(
			globalResults[--globalResultsIndex].arr,
			globalResults[globalResultsIndex]
		);
	}
});

//############# ANIMATION #############
let animate = setInterval(() => {
	if (stop) {
		return;
	}

	const ans = globalResults[++globalResultsIndex];
	if (ans === undefined) {
		stop = true;
		return;
	}

	draw(ans.arr, ans);
}, SPEED[speed.value]);

//############# END OF CODE #############
