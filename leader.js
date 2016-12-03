function Leader(x, y, team) {
  const size = 30

  this.team = team;
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
    }

    ctx.beginPath()
    ctx.ellipse(x, y, size, size, 0, 0, 2 * Math.PI);
    ctx.stroke()
    ctx.fill()
  }
}
