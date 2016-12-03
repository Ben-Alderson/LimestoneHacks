var canvas = document.getElementById("canvas")
var ctx = canvas.getContext('2d')

function intersects(a, b) {
  var dist = Math.pow(a.x-b.x,2)+Math.pow(a.y-b.y,2)
  return dist < Math.pow(a.size + b.size, 2)
}

var citizens = [];
citizens.push(new Citizen(40, 40))

var leader_red = new Leader(100, 40, "red")
leader_red.move = function() {
  if(isKeyDown(87)) this.y -= this.moveSpeed // W
  if(isKeyDown(83)) this.y += this.moveSpeed // S
  if(isKeyDown(65)) this.x -= this.moveSpeed // A
  if(isKeyDown(68)) this.x += this.moveSpeed // D
}
citizens.push(leader_red)

var leader_blue = new Leader(100, 40, "blue")
leader_blue.move = function() {
  if(isKeyDown(73)) this.y -= this.moveSpeed // I
  if(isKeyDown(75)) this.y += this.moveSpeed // K
  if(isKeyDown(74)) this.x -= this.moveSpeed // J
  if(isKeyDown(76)) this.x += this.moveSpeed // L
}
citizens.push(leader_blue)

function mainLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  for(i = 0; i < citizens.length; i++) {
    for(j = i+1; j < citizens.length; j++) {
      if(intersects(citizens[i], citizens[j])) {
        citizens[i].touch(citizens[j])
        citizens[j].touch(citizens[i])
      }
    }
  }

  for(var c of citizens) {
    c.update();
    c.draw()
  }
}

setInterval(mainLoop, 16)
