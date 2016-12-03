function Citizen(x, y) {
  const size = 10

  this.team = "neutral"
  this.passion = 1;
  this.x = x;
  this.y = y;

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
    ctx.ellipse(x+Math.random()*this.passion, y+Math.random()*this.passion, size, size, 0, 0, 2 * Math.PI);
    ctx.stroke()
    ctx.fill()
  }
}
