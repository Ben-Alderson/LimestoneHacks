var canvas = document.getElementById("canvas")
var ctx = canvas.getContext('2d')

function intersects(a, b) {
  var dist = Math.pow(a.x-b.x,2)+Math.pow(a.y-b.y,2)
  return dist < Math.pow(a.size + b.size, 2)
}

window.onresize = function() {
  canvas.width = document.body.clientWidth
  canvas.height = document.body.clientHeight
}
window.onresize();

var citizens = [];
for(i = 0; i<11; i++)
  citizens.push(new Citizen(Math.random() * canvas.width, Math.random() * canvas.height))

var leader_red = new Leader(100, 40, "red")
leader_red.move = function() {
  if(isKeyDown(87)) this.vy -= this.moveSpeed // W
  if(isKeyDown(83)) this.vy += this.moveSpeed // S
  if(isKeyDown(65)) this.vx -= this.moveSpeed // A
  if(isKeyDown(68)) this.vx += this.moveSpeed // D
}
citizens.push(leader_red)

var leader_blue = new Leader(100, 10, "blue")
leader_blue.move = function() {
  if(isKeyDown(73)) this.vy -= this.moveSpeed // I
  if(isKeyDown(75)) this.vy += this.moveSpeed // K
  if(isKeyDown(74)) this.vx -= this.moveSpeed // J
  if(isKeyDown(76)) this.vx += this.moveSpeed // L
}

citizens.push(leader_blue)

var leader_green = new Leader(90, 10, "green")
leader_green.move = function(){
	this.vx = Math.min(this.vx, 2);
	this.vx = Math.max(this.vx, -2);
	this.vy = Math.min(this.vy, 2);
	this.vy = Math.max(this.vy, -2);
}
leader_green.attract = function(other){
    const pull = 10000.0

    var dx = other.x - this.x
    var dy = other.y - this.y

    var dist = Math.pow(dx, 2) + Math.pow(dy, 2)
    var dx = dx / Math.sqrt(dist)
    var dy = dy / Math.sqrt(dist)

    if(dx && dy && other.team == "neutral") {
      this.vx += pull*dx/Math.max(dist, 20)
      this.vy += pull*dy/Math.max(dist, 20)
    }
}

citizens.push(leader_green);

var leader_yellow = new Leader(90, 9, "yellow");
leader_yellow.move = function(){
	this.vx = Math.min(this.vx, 2);
	this.vx = Math.max(this.vx, -2);
	this.vy = Math.min(this.vy, 2);
	this.vy = Math.max(this.vy, -2);
}
leader_yellow.attract = function(other){
    const pull = 10000.0

    var dx = other.x - this.x
    var dy = other.y - this.y

    var dist = Math.pow(dx, 2) + Math.pow(dy, 2)
    var dx = dx / Math.sqrt(dist)
    var dy = dy / Math.sqrt(dist)

    if(dx && dy && other.team == "neutral") {
      this.vx += pull*dx/Math.max(dist, 20)
      this.vy += pull*dy/Math.max(dist, 20)
	}
}

citizens.push(leader_yellow);



function mainLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  for(i = 0; i < citizens.length; i++) {
    for(j = i+1; j < citizens.length; j++) {
      if(intersects(citizens[i], citizens[j])) {
        citizens[i].touch(citizens[j])
        citizens[j].touch(citizens[i])
      }
      citizens[i].attract(citizens[j])
      citizens[j].attract(citizens[i])
    }
  }

  for(var c of citizens) {
    c.update();
    c.draw()
  }

  citizens = citizens.filter((e) => !e.deleted)
}

setInterval(mainLoop, 16)
