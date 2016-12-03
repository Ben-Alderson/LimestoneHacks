function Citizen(x, y) {
  this.size = 10

  this.deleted = false
  this.is_citizen = true
  this.team = "neutral"
  this.attackProgress = 0
  this.attackTeam = "neutral"
  this.passion = 2
  this.static_x = x
  this.static_y = y
  this.vx = 0
  this.vy = 0

  this.touch = function(other) {
    const push = 0.1
    // if(this.team == "neutral" || other.is_citizen) {
      other.vx += (other.x - this.x) * push
      other.vy += (other.y - this.y) * push
    // }

    if(other.is_citizen && other.team != this.team && other.team != "neutral" && this.team != "neutral") {
      other.team = "neutral"
      this.team = "neutral"
    }
  }

  this.attract = function(other) {
    const pull = 10.0

    var dx = other.x - this.x
    var dy = other.y - this.y

    var dist = Math.abs(dx) + Math.abs(dy)//Math.pow(dx, 2) + Math.pow(dy, 2)
    var dx = dx / Math.sqrt(dist)
    var dy = dy / Math.sqrt(dist)

    if(other.team != this.team && this.x && other.x && this.team != "neutral" && other.team != "neutral" && other.team != "dead") {
      this.vx += pull*dx/Math.max(dist, 20)
      this.vy += pull*dy/Math.max(dist, 20)
    }
  }

  this.update = function() {
    const friction = 0.98
    const passion_friction = 0.95
    const max_speed = 10;

    this.static_x += this.vx
    this.static_y += this.vy
    // if(this.team == "neutral") {
      this.vx *= friction
      this.vy *= friction
    // } else {
    //   this.vy = Math.max(this.vy, -max_speed)
    //   this.vy = Math.min(this.vy, max_speed)
    //   this.vx = Math.max(this.vx, -max_speed)
    //   this.vx = Math.min(this.vx, max_speed)
    // }

    this.x = this.static_x + Math.random() * this.passion - this.passion/2;
    this.y = this.static_y + Math.random() * this.passion - this.passion/2;
    this.passion *= passion_friction

    if (this.x < this.size){
      this.vx = Math.abs(this.vx + 1);
    }
    if (this.y < this.size){
      this.vy = Math.abs(this.vy + 1);
    }
    if (this.x > canvas.width - this.size){
      this.vx = 0 - Math.abs(this.vx + 1);
    }
    if (this.y > canvas.height - this.size){
      this.vy = 0 - Math.abs(this.vy + 1);
    }

    if(this.attackProgress >= 100) {
      this.team = this.attackTeam
      this.attackTeam = "neutral"
      this.attackProgress = 0
    }

    this.static_x += this.vx
    this.vx *= friction
    this.static_y += this.vy
    this.vy *= friction

    this.x = this.static_x + Math.random() * this.passion - this.passion/2;
    this.y = this.static_y + Math.random() * this.passion - this.passion/2;
    this.passion *= passion_friction
  }

  this.draw = function() {
    setFillColour(this.attackTeam)

    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.size * 2, this.size * 2, 0, 0, this.attackProgress / 100 * 2 * Math.PI)
    ctx.lineTo(this.x, this.y)
    ctx.fill();

    setFillColour(this.team)
    ctx.strokeStyle = "#000000"
    ctx.beginPath()
    ctx.ellipse(this.x, this.y, this.size, this.size, 0, 0, 2 * Math.PI)
    ctx.stroke()
    ctx.fill()
  }
}

function setFillColour(c) {
  switch(c){
    case "red":
      ctx.fillStyle = "#ff0000"
      break
    case "blue":
      ctx.fillStyle = "#00ffff"
      break
    case "green":
      ctx.fillStyle = "#00ff00"
      break
    case "yellow":
      ctx.fillStyle = "#ffff00";
      break
    case "dead":
      ctx.fillStyle = "#663300";
      break
    case "neutral":
      ctx.fillStyle = "#ffffff"
      break
	}
}
