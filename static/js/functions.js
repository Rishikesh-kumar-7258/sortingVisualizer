// "use strict";
// exports.__esModule = true;
// exports.BubbleSort = exports.GenerateNumbers = void 0;
// Function to generate random numbers
function GenerateNumbers(count) {
    if (count === void 0) { count = 10; }
    var arr = [];
    for (var i = 0; i < count; i++) {
        arr.push(i + 1);
    }
    Randomize(arr);
    return arr;
}
// exports.GenerateNumbers = GenerateNumbers;
// Function to randomize an array
function Randomize(arr) {
    var arrSize = arr.length;
    for (var i = 0; i < arrSize; i++) {
        var randIndex = Math.round(i + 1 + Math.random() * (arrSize - i - 1));
        swap(arr, i, randIndex);
    }
}
// Function to swap two numbers
function swap(arr, i, j) {
    arr[i] ^= arr[j];
    arr[j] ^= arr[i];
    arr[i] ^= arr[j];
}
// Bubble sort function
function BubbleSort(arr) {
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr.length; j++) {
            if (arr[i] < arr[j]) {
                var temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}
// exports.BubbleSort = BubbleSort;
export {GenerateNumbers, BubbleSort};
