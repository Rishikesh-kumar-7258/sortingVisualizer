# Sorting Visualizer

## Tasks

-   [x] Create a mobile responsive canvas to display the visualizer.
-   [x] Generate random numbers.
-   [x] Generate the canvas where visualization will happen.
-   [x] Create a template class which we will use to create all the algorithms
-   [ ] Create a button to reshuffle the array
-   [ ] Start and Stop button
-   [ ] Create algorithms to show

## Options

1. Size of random numbers
2. Set speed
3. Choose the algorithm
4. Reshuffle the array
5. start / stop button

---

## Learnings

## Shuffling an array

It means shuffle an array from sorted to unsorted. There are many ways to unshuffle the array. But fisher-yates or Knusth algorithm is most efficient and widely used.

[Wikipedia page for Fisher-Yates Shuffle Algorithm](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)

Wikipedia page for Fisher-Yates Shuffle Algorithm

### Naive Shuffle

1. Loop through the array a set number of times
2. In each iteration, randomly select two indices
3. Swap the values at these indices

_Time Complexity_

$O(K)$ where K is the number of times array is looped

_Drawback_

Some permutations are more likely than others.

---

### Randomized sorting key

1. Generate a random number for each element.
2. Sort the elements using the random number as keys

_Time Complexity_

$O(N \cdot logN)$ Where N is number of elements in array

_Drawback_

Computationally expensive

---

### Fisher-Yates or Knuth Algorithm or Durstenfeld algorithm

1. Start from the last element of array
2. Swap it with a randomly selected index which comes before it (including itself)
3. Repeat the process for each index (moving backwards)

_Time Complexity_

$O(N)$ Where N is number of elements in array

## OOPs in JS

[Introducing JavaScript objects - Learn web development | MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects)

Objects and Classes in JS

![IMG-20241205-WA0009.jpg](https://prod-files-secure.s3.us-west-2.amazonaws.com/64c27dcd-aee1-4ccb-94f6-39bdd786a96d/96d613dc-9f6d-437b-b960-fe0b5290d476/IMG-20241205-WA0009.jpg)

![IMG-20241205-WA0011.jpg](https://prod-files-secure.s3.us-west-2.amazonaws.com/64c27dcd-aee1-4ccb-94f6-39bdd786a96d/55b756d4-cf8b-4eb0-8034-87719b51a3a6/IMG-20241205-WA0011.jpg)

![IMG-20241205-WA0008.jpg](https://prod-files-secure.s3.us-west-2.amazonaws.com/64c27dcd-aee1-4ccb-94f6-39bdd786a96d/3c354e60-ca36-4afc-8537-3ea0bb2f74f5/IMG-20241205-WA0008.jpg)

![IMG-20241205-WA0010.jpg](https://prod-files-secure.s3.us-west-2.amazonaws.com/64c27dcd-aee1-4ccb-94f6-39bdd786a96d/ddbb8ee1-ca40-496b-8fa5-5fbdc6a2a741/IMG-20241205-WA0010.jpg)

![IMG-20241205-WA0012.jpg](https://prod-files-secure.s3.us-west-2.amazonaws.com/64c27dcd-aee1-4ccb-94f6-39bdd786a96d/322ea76d-5f04-496e-871e-aa0ccce8dc4a/IMG-20241205-WA0012.jpg)

![IMG-20241205-WA0013.jpg](https://prod-files-secure.s3.us-west-2.amazonaws.com/64c27dcd-aee1-4ccb-94f6-39bdd786a96d/cd59a0b6-9f3a-49a3-8b31-e46754438469/IMG-20241205-WA0013.jpg)

![IMG-20241205-WA0014.jpg](https://prod-files-secure.s3.us-west-2.amazonaws.com/64c27dcd-aee1-4ccb-94f6-39bdd786a96d/25d28f22-a3d4-4908-91c9-fdb57f7d7734/IMG-20241205-WA0014.jpg)

![IMG-20241205-WA0015.jpg](https://prod-files-secure.s3.us-west-2.amazonaws.com/64c27dcd-aee1-4ccb-94f6-39bdd786a96d/9ac870b2-a377-4c2b-8bdf-85259328605f/IMG-20241205-WA0015.jpg)

## Sorting Algorithms

### Bubble Sort

[Bubble sort](https://en.wikipedia.org/wiki/Bubble_sort)

Reading material for Bubble Sort algorithm

```jsx
function BubbleSort(arr) {
	let n = arr.length;
	for (let i = 0; i < n - 1; i++) {
		let swapped = false;
		for (let j = 0; j < n - i - 1; j++) {
			if (arr[j] > arr[j + 1]) {
				[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
				swapped = true;
			}
		}

		if (!swapped) {
			break;
		}
	}
}
```

_Time Complexity_ : $O(N^2)$

_Space Complexity_: $O(1)$

### Merge Sort

### Selection Sort

[Selection sort](https://en.wikipedia.org/wiki/Selection_sort)

Reading Material

```jsx
function SelectionSort(arr) {
	let n = arr.length;
	for (let i = 0; i < n - 1; i++) {
		let minIndex = i;
		for (let j = i + 1; j < n; j++) {
			if (arr[minIndex] > arr[j]) {
				minIndex = j;
			}
		}

		[arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
	}
	ans.push({
		arr: arr.slice(),
	});
}
```

_Time Complexity_ : $O(N^2)$

_Space Complexity_ : $O(1)$

### Insertion Sort

[Insertion sort](https://en.wikipedia.org/wiki/Insertion_sort)

Reading Material

```jsx
function InsertionSort(arr) {
	for (let i = 1; i < n; i++) {
		let j = i - 1;

		while (j >= 0 && arr[j] > arr[j + 1]) {
			[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
			j--;
		}
	}
}
```

_Time Complexity_ : $O(N^2)$

_Space Complexity_ : $O(1)$
