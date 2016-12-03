

function Citizen(x, y) {
  this.size = 10

  this.team = "neutral"
  this.x = x;
  this.y = y;

  this.touch = function(other) {
  }

  this.update = function() {

  }

  this.draw = function() {
    switch(this.team) {
    case "red":
      ctx.fillStyle = "#ff0000"
      ctx.strokeStyle = "#000000"
      break
    case "blue":
      ctx.fillStyle = "#00ffff"
      ctx.strokeStyle = "#000000"
      break
    case "neutral":
      ctx.fillStyle = "#ffffff"
      ctx.strokeStyle = "#000000"
      break
    }
    ctx.beginPath()
    ctx.ellipse(x, y, this.size, this.size, 0, 0, 2 * Math.PI);
    ctx.stroke()
    ctx.fill()
  }
}
