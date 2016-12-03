function Citizen(x, y) {
  this.size = 10

  this.team = "neutral"
  this.attackProgress = 0;
  this.attackTeam = "neutral";
  this.passion = 1
  this.x = x
  this.y = y
  this.vx = 0
  this.vy = 0

  this.touch = function(other) {
  }

  this.update = function() {
    this.x += this.vx
    this.vx *= 0.9
    this.y += this.vy
    this.vy *= 0.9
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
      ctx.fillStyle = "#ffffff"
      ctx.strokeStyle = "#000000"
      break
	}
	
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
    ctx.ellipse(this.x+Math.random()*this.passion, this.y+Math.random()*this.passion, this.size, this.size, 0, 0, 2 * Math.PI)
    ctx.stroke()
    ctx.fill()
  }
}
