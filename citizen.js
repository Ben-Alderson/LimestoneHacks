function Citizen(x, y) {
  this.size = 10

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
    other.vx += (other.x - this.x) * push
    other.vy += (other.y - this.y) * push
  }

  this.update = function() {
    const friction = 0.98
    const passion_friction = 0.95

    if (this.x < this.size){
      this.vx = 5;
    }
    if (this.y < this.size){
      this.vy = 5;
    }
    if (this.x > canvas.width - this.size){
      this.vx = -5;
    }
    if (this.y > canvas.height - this.size){
      this.vy = -5;
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
  switch(this.attackTeam){
    case "red":
      ctx.fillStyle = "#ff0000"
      ctx.strokeStyle = "#ff0000"
      break
    case "blue":
      ctx.fillStyle = "#00ffff"
      ctx.strokeStyle = "#00ffff"
      break
    case "neutral":
      ctx.fillStyle = "#ffffff"
      ctx.strokeStyle = "#ffffff"
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
