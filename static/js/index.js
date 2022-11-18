// "use strict";
// exports.__esModule = true;
// var functions_1 = require("./functions");

import { GenerateNumbers } from "/static/js/functions.js";
// Variables
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
// Setting width height of canvas
canvas.width = window.innerWidth / 2;
canvas.height = window.innerHeight / 2;
canvas.style.cssText = 'background : black';
// Generating random numbers on clicking the button
var randomNumbersBtn = document.querySelector(".randomNumbersBtn");
var numbersArea = document.querySelector(".numbers");
numbersArea.style.cssText = 'background : white;';
randomNumbersBtn.addEventListener('click', function () {
    console.log("This should be working");
    var arr = (0, GenerateNumbers)();
    alert(arr);
    // let inner = "";
    // for (let i = 0; i < arr.length; i++) {
    //     inner += arr[i] + ' ';
    // }
    // numbersArea.innerText = inner;
});
