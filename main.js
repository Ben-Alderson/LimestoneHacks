var canvas = document.getElementById("canvas")
var ctx = canvas.getContext('2d')

function intersects(a, b) {
  var dist = Math.pow(a.x-b.x,2)+Math.pow(a.y-b.y,2)
  return dist < Math.pow(a.size + b.size, 2)
}

var citizens = [];

function aiGenesis(colour) {
  var new_ai = new Leader(Math.random() * canvas.width, Math.random() * canvas.height, colour)
  new_ai.move = function(){
  	this.vx = Math.min(this.vx, 2);
  	this.vx = Math.max(this.vx, -2);
  	this.vy = Math.min(this.vy, 2);
  	this.vy = Math.max(this.vy, -2);
  }
  new_ai.attract = function(other){
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
  citizens.push(new_ai);
}

function playerGenesis(side, colour) {
  var new_player = new Leader(Math.random() * canvas.width, Math.random() * canvas.height, colour)
  if(side == "left")
    new_player.move = function() {
      if(isKeyDown(87)) this.vy -= this.moveSpeed // W
      if(isKeyDown(83)) this.vy += this.moveSpeed // S
      if(isKeyDown(65)) this.vx -= this.moveSpeed // A
      if(isKeyDown(68)) this.vx += this.moveSpeed // D
    }
  else
    new_player.move = function() {
      if(isKeyDown(73)) this.vy -= this.moveSpeed // I
      if(isKeyDown(75)) this.vy += this.moveSpeed // K
      if(isKeyDown(74)) this.vx -= this.moveSpeed // J
      if(isKeyDown(76)) this.vx += this.moveSpeed // L
    }
  citizens.push(new_player)
}

function randomColor() {
  return "rgb(" + Math.random()*255.0 + ", " + Math.random()*255.0 + ", " + Math.random()*255.0 + ")"
}

function citizenGenesis() {
  citizens.push(new Citizen(Math.random() * canvas.width, Math.random() * canvas.height))
}

function genocide() {
  citizens = []
}

window.onresize = function() {
  canvas.width = document.body.clientWidth
  canvas.height = document.body.clientHeight
}
window.onresize();

function mainLoop() {
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

var mode = "PREBEES"
function menu() {
  switch(mode){
  case "PREMENU":
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    genocide()
    for(i=0;i<10;i++) citizenGenesis()
    for(i=0;i<4;i++) aiGenesis(randomColor())
    mode = "MENU"
  case "MENU":
    mainLoop()
    break
  case "PREBEES":
    genocide()
    for(i = 0; i<11; i++) citizenGenesis()
    playerGenesis("left", "#ff0000")
    playerGenesis("right", "#00ffff")
    aiGenesis("#00ff00")
    aiGenesis("#ffff00")
    mode = "BEES"
  case "BEES":
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    mainLoop()
    break
  }
}

setInterval(menu, 16)
