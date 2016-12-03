function Leader(x, y, team) {
  this.size = 30
  this.moveSpeed = 1;

  this.team = team;
  this.x = x;
  this.y = y;

  this.touch = function(other) {
    console.log(other);
  }

  this.update = function() {
    if(isKeyDown(87)) { // W
      this.y -= this.moveSpeed;
    }
    if(isKeyDown(83)) { // S
      this.y += this.moveSpeed;
    }
    if(isKeyDown(65)) { // A
      this.x -= this.moveSpeed;
    }
    if(isKeyDown(68)) { // D
      this.x += this.moveSpeed;
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
    ctx.ellipse(this.x, this.y, this.size, this.size, 0, 0, 2 * Math.PI);
    ctx.stroke()
    ctx.fill()
  }
}
