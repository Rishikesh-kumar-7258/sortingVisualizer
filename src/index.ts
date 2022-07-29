const canvas : HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx : CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;

ctx.rect(50, 50, canvas.width/2, canvas.height/2);
