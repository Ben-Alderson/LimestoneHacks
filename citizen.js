function Citizen(x, y) {
  this.size = 10

  this.team = "neutral"
  this.attackProgress = 75;
  this.attackTeam = "neutral";
  this.passion = 1
  this.static_x = x
  this.static_y = y
  this.vx = 0
  this.vy = 0

  this.touch = function(other) {
  }

  this.update = function() {
    const friction = 0.9
    this.static_x += this.vx
    this.vx *= friction
    this.static_y += this.vy
    this.vy *= friction

    this.x = this.static_x + Math.random() * this.passion - this.passion/2;
    this.y = this.static_y + Math.random() * this.passion - this.passion/2;
  }

  this.draw = function() {
    switch(this.attackTeam){
    case "red":
        ctx.fillStyle = "#ff0000"
        ctx.strokeStyle = "#000000"
        break
      case "blue":
        ctx.fillStyle = "#00ffff"
        ctx.strokeStyle = "#000000"
        break
      case "neutral":
        ctx.fillStyle = "#000000"
        ctx.strokeStyle = "#000000"
        break
    }
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.size * 2, this.size * 2, 0, 0, this.attackProgress / 100 * 2 * Math.PI)
    ctx.lineTo(this.x, this.y)
    ctx.fill();

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
    ctx.ellipse(this.x, this.y, this.size, this.size, 0, 0, 2 * Math.PI)
    ctx.stroke()
    ctx.fill()
  }
}
