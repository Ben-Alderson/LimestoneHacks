function Leader(x, y, team) {
  this.size = 30
  this.moveSpeed = 1

  this.team = team
  this.x = x
  this.y = y
  this.vx = 0
  this.vy = 0

  this.touch = function(other) {
    const push = 0.1
    other.vx += (other.x - this.x) * push
    other.vy += (other.y - this.y) * push

    if(other.team != this.team) {
      if(other.attackTeam == this.team) {
        other.attackProgress += 10
        other.passion += 4
      } else if(other.attackTeam == "neutral") {
        other.attackProgress += 10
        other.passion += 4
        other.attackTeam = this.team
      } else {
        other.attackProgress -= 10
        other.passion += 4
        if(other.attackProgress <= 0)
          other.attackTeam = "neutral"
      }
    }
  }

  this.update = function() {
    this.move()
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
    ctx.ellipse(this.x, this.y, this.size, this.size, 0, 0, 2 * Math.PI)
    ctx.stroke()
    ctx.fill()
  }
}
