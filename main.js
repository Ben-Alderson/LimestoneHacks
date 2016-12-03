var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');

function Citizen() {
  this.team = "neutral";
  this.x;
  this.y;

  this.draw = function() {
    console.log(this);
    switch(this.team) {
    case "neutral":
      ctx.fillStyle = "#ffffff"
      ctx.strokeStyle = "#000000"
      break;
    }

    ctx.fillRect(10 + Math.random()*10, 10, 55, 50);
    ctx.strokeRect(10 + Math.random()*10, 10, 55, 50);
  }
}

var citizens = [];
citizens.push(new Citizen());

function draw() {
  for(var c of citizens) {
    c.draw();
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

setInterval(draw, 16);
