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
      other.attackTeam = this.team
      other.attackProgress += 10
    }
  }

  this.update = function() {
	  
    const friction = 0.9
    this.vx *= friction
    this.vy *= friction
	
    if(isKeyDown(87)) { // W
	  this.vy -= 1;
    }
    if(isKeyDown(83)) { // S
	  this.vy += 1;
    }
    if(isKeyDown(65)) { // A
	  this.vx -= 1;
    }
    if(isKeyDown(68)) { // D
	  this.vx += 1;
    }
	
    this.y += this.vy;
    this.x += this.vx
	
	if (this.x < this.size){
		this.vx = Math.abs(this.vx);
	}
	if (this.y < this.size){
		this.vy = Math.abs(this.vy);
	}
	if (this.x > canvas.width - this.size){
		this.vx = 0 - Math.abs(this.vx);
	}
	if (this.y > canvas.height - this.size){
		this.vy = 0 - Math.abs(this.vy);
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
