// FFISHER-YATES SHUFFLE ALGORITHM
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
	#name = "";

	// CONSTRUCTOR
	constructor(arr, name) {
		this.arr = arr;
		this.name = name;
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

	get name() {
		return this.#name;
	}

	// METHODS
	sort() {
		// OVERRIDE THIS METHOD
	}
}
