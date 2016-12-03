function Citizen() {
  this.team = "neutral"
  this.x = 10;
  this.y = 10;

  this.draw = function() {
    console.log(this)
    switch(this.team) {
	case "red":
      ctx.fillStyle = "#ff0000"
      ctx.strokeStyle = "#000000"
	  break;
	case "blue":
      ctx.fillStyle = "#00ffff"
      ctx.strokeStyle = "#000000"
	  break;
    case "neutral":
      ctx.fillStyle = "#ffffff"
      ctx.strokeStyle = "#000000"
      break
    }
    ctx.fillRect(this.x + Math.random()*10, this.y + Math.random()*10, 55, 50)
    ctx.strokeRect(this.x + Math.random()*10, this.y + Math.random()*10, 55, 50)
  }
}
