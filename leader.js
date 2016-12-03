function Leader(x, y, team) {
  this.size = 30
  this.moveSpeed = 1

  this.deleted = false
  this.team = team
  this.x = x
  this.y = y
  this.vx = 0
  this.vy = 0

  this.attract = function(other) {
    // const pull = 1.0
    //
    // var dx = other.x - this.x
    // var dy = other.y - this.y
    //
    // var dist = Math.abs(dx) + Math.abs(dy)//Math.pow(dx, 2) + Math.pow(dy, 2)
    // var dx = dx / Math.sqrt(dist)
    // var dy = dy / Math.sqrt(dist)
    //
    // if(other.team != this.team && dx && dy && this.team != "neutral" && other.team != "neutral") {
    //   this.vx += pull*dx/Math.max(dist, 20)
    //   this.vy += pull*dy/Math.max(dist, 20)
    // }
  }

  this.touch = function(other) {
    const push = 0.1
    // if(other.team == "neutral" || !other.is_citizen) {
      other.vx += (other.x - this.x) * push
      other.vy += (other.y - this.y) * push
    // }

    if(other.team == "neutral") {
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
    const friction = 0.9
    this.vx *= friction
    this.vy *= friction

    this.move()

    this.y += this.vy;
    this.x += this.vx

    if (this.x < this.size){
      this.vx = Math.abs(this.vx + this.moveSpeed);
    }
    if (this.y < this.size){
      this.vy = Math.abs(this.vy + this.moveSpeed);
    }
    if (this.x > canvas.width - this.size){
      this.vx = 0 - Math.abs(this.vx + this.moveSpeed);
    }
    if (this.y > canvas.height - this.size){
      this.vy = 0 - Math.abs(this.vy + this.moveSpeed);
    }
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
