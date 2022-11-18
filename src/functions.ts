// Function to generate random numbers
export function GenerateNumbers(count : number = 10) {

  let arr = [];
  for (let i = 0; i < count; i++) {
    arr.push(i+1);
  }

  Randomize(arr);
  return arr;
}

// Function to randomize an array
function Randomize(arr : number[]) {
  let arrSize = arr.length;

  for (let i = 0; i < arrSize; i++) {
    let randIndex = Math.round(i + 1 + Math.random() * (arrSize - i - 1));
    swap(arr, i, randIndex);
  }
}

// Function to swap two numbers
function swap(arr : number[], i : number, j : number) {
  arr[i] ^= arr[j];
  arr[j] ^= arr[i];
  arr[i] ^= arr[j];
}

// Bubble sort function
export function BubbleSort(arr : number[]) : number[] {
  for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
          if (arr[i] < arr[j]) {
              let temp = arr[i];
              arr[i] = arr[j];
              arr[j] = temp;
          }
      }
  }
  return arr;
}