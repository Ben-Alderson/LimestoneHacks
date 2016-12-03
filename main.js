var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');

function draw() {
  ctx.fillStyle = "rgb(200,0,0)"; // sets the color to fill in the rectangle with
ctx.fillRect(10, 10, 55, 50);   // draws the rectangle at position 10, 10 with a width of 55 and a height of 50
}

draw();
