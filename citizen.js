function Citizen() {
  this.team = "neutral"
  this.x
  this.y

  this.draw = function() {
    console.log(this)
    switch(this.team) {
	case "red":
      ctx.fillStyle = "#ff0000"
      ctx.strokeStyle = "#000000"
	case "blue":
      ctx.fillStyle = "#00ffff"
      ctx.strokeStyle = "#000000"
    case "neutral":
      ctx.fillStyle = "#ffffff"
      ctx.strokeStyle = "#000000"
      break
    }
    ctx.fillRect(10 + Math.random()*10, 10 + Math.random()*10, 55, 50)
    ctx.strokeRect(10 + Math.random()*10, 10 + Math.random()*10, 55, 50)
  }
}
