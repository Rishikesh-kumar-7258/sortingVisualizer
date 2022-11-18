import { GenerateNumbers } from "./functions";

// Variables
const canvas : HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
const ctx : CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;

// Setting width height of canvas
canvas.width = window.innerWidth / 2;
canvas.height = window.innerHeight / 2;
canvas.style.cssText = 'background : black';

// Generating random numbers on clicking the button
const randomNumbersBtn : HTMLElement = document.querySelector(".randomNumbersBtn");
const numbersArea : HTMLElement = document.querySelector(".numbers");
numbersArea.style.cssText = 'background : white;';

randomNumbersBtn.addEventListener('click', () => {
    console.log("This should be working");
    const arr = GenerateNumbers();

    alert(arr);
    // let inner = "";
    // for (let i = 0; i < arr.length; i++) {
    //     inner += arr[i] + ' ';
    // }

    // numbersArea.innerText = inner;
})