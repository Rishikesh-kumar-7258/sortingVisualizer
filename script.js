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

const ALGORITHMS = {
	"Bubble Sort": BubbleSort,
	"Selection Sort": SelectionSort,
	"Insertion Sort": InsertionSort,
};

const SPEED = {
	Fast: 20,
	Medium: 50,
	Slow: 100,
};

// ################## DOM MANIPULATION ##################
//  DOM ELEMENTS
const randSize = document.getElementById("randomNumbers");
const speed = document.getElementById("speed");
const algorithm = document.getElementById("algorithm");
const sortBtn = document.getElementById("sortBtn");
const drawDiv = document.getElementById("drawDiv");
const canvas = document.getElementById("canvas");
canvas.width = drawDiv.clientWidth;
canvas.height = drawDiv.clientHeight;
const ctx = canvas.getContext("2d");

// VARIABLES
const arr = Array.from({ length: randSize.value }, (_, i) => i + 1);
Shuffle(arr);

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

		if (options.current === i) {
			ctx.fillStyle = "red";
		}

		if (options.minIndex === i) {
			ctx.fillStyle = "blue";
		}

		ctx.fillRect(i * w, h - arr[i] * m, w - 2, arr[i] * m);
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
fillOptions(algorithm, Object.keys(ALGORITHMS));
fillOptions(speed, Object.keys(SPEED));
speed.value = "Medium";

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

// sort button
sortBtn.addEventListener("click", () => {
	const algo = new ALGORITHMS[algorithm.value](arr);
	const ans = algo.sort();

	for (let i = 0; i < ans.length; i++) {
		setTimeout(() => {
			draw(ans[i].arr, ans[i]);
		}, i * SPEED[speed.value]);
	}
});
