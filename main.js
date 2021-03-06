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
  	this.vx = Math.min(this.vx, 3);
  	this.vx = Math.max(this.vx, -3);
  	this.vy = Math.min(this.vy, 3);
  	this.vy = Math.max(this.vy, -3);
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
  return "hsl(" + (Math.random()*10+ 50) + ", 100%, 50%)"
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

function inRectangle(tx, ty, x, y, w, h) {
  if(tx < x || ty < y || tx > x + w || ty > y + h) {
    return false;
  } else {
    return true;
  }
}

canvas.onclick = function(e) {
  var x;
  var y;
  if (e.pageX || e.pageY) {
    x = e.pageX;
    y = e.pageY;
  }
  else {
    x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }

  // if(inRectangle(x, y, canvas.width*.5 - titleWidth*.5, 100, titleWidth, titleHeight)) {
  //   mode =
  // }
  if(inRectangle(x, y, canvas.width*.5 - titleWidth*.5, canvas.height - 100 - 47, titleWidth, titleHeight)) {
    mode = "PREBEES"
  }
  // if(inRectangle(x, y, canvas.width*.5 - titleWidth*.5, 300, titleWidth, titleHeight)) {
  //   console.log(3);
  // }
}

var titleWidth = 600;
var titleHeight = 50;
var currentSelection;
var mode = "PREMENU"
function menu() {
  switch(mode){
  case "PREMENU":
    ctx.fillStyle = "#ffffee" //background
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    genocide()
    for(i=0;i<30;i++) citizenGenesis()
    for(i=0;i<4;i++) aiGenesis(randomColor())
    mode = "MENU"
  case "MENU":
    mainLoop()

	var titleWidth = 640;
	var titleHeight = 50;
	ctx.fillStyle = "#000000";//title
	ctx.fillRect(canvas.width*.5 - titleWidth*.5 - 5, 100 - 5, titleWidth + 10, titleHeight + 10);

	ctx.fillStyle = "#ffff33";//title

	ctx.fillRect(canvas.width*.5 - titleWidth*.5, 100, titleWidth, titleHeight);


	ctx.fillStyle = "#000000";//BEEEES
	ctx.font="50px Georgia";
	ctx.fillText("NOT THE BEEEESSSSSSSS!",canvas.width*.5 - titleWidth*.5,143);

	ctx.fillStyle = "#dddddd"; //background
	ctx.fillRect(canvas.width*.5 - titleWidth*.5 - 4, canvas.height - 100 - 40, titleWidth - 23, titleHeight);

	ctx.fillStyle = "#00ffff";
	ctx.fillStyle = "#000000";
	ctx.font="italic 45px Georgia";
	ctx.fillText("Press Enter to Start the Game",canvas.width*.5 - titleWidth*.5,canvas.height - 100);

    for(c of citizens) {
      if(c.team == "dead") {
        aiGenesis(randomColor())
        c.deleted = true;
      }
    }

    if(isKeyDown(13)) {
      mode = "PREBEES"
    }
    break
  case "PREBEES":
    genocide()
    for(i = 0; i<21; i++) citizenGenesis()
    playerGenesis("left", "#ff0000")
    playerGenesis("right", "#00ffff")
    aiGenesis("#00ff00")
    aiGenesis("#ffff00")
    mode = "BEES"
  case "BEES":
    ctx.clearRect(0, 0, canvas.width, canvas.height)
	ctx.fillStyle = "#eeeeee";
	ctx.font="italic 45px Georgia";
	ctx.fillText("Controls: WASD / IJKL", canvas.width*.5 - 250,canvas.height*.5);
    mainLoop()
    var count = 0
    for(c of citizens) {
      if(c.team == "dead") {
        count += 1
      }
    }
    // if(count == 3)
      // mode = "DED"
    break
  // case "DED":
  //   ctx.clearRect(0, 0, canvas.width, canvas.height)
  //   mainLoop();
  //   ctx.fillStyle = "#00ffff";
  //   var titleWidth = 600;
  //   var titleHeight = 50;
  //
  //   ctx.fillRect(canvas.width*.5 - titleWidth*.5, 100, titleWidth, titleHeight);
  //
  //   ctx.fillStyle = "#000000";
  //   ctx.font="50px Georgia";
  //   switch(citizens.filter(function(c) {!c.is_citizen && c.team != "dead"})[0].team) {
  //     case "#ff0000":
  //       ctx.fillText("RED WINS",canvas.width*.5 - titleWidth*.5,143);
  //       break
  //     case "#00ffff":
  //       ctx.fillText("BLUE WINS",canvas.width*.5 - titleWidth*.5,143);
  //       break
  //     case "#00ff00":
  //       ctx.fillText("GREEN WINS",canvas.width*.5 - titleWidth*.5,143);
  //       break
  //     case "#ffff00":
  //       ctx.fillText("YELLOW WINS",canvas.width*.5 - titleWidth*.5,143);
  //       break
  //   }
  //
  //   ctx.fillStyle = "#dddddd";
  //   ctx.fillRect(canvas.width*.5 - titleWidth*.5, canvas.height - 100 - 47, titleWidth, titleHeight);
  //   ctx.fillStyle = "#00ffff";
  //   ctx.fillStyle = "#000000";
  //   ctx.font="45px Georgia";
  //   ctx.fillText("Press Enter to Start the Game",canvas.width*.5 - titleWidth*.5,canvas.height - 100);
  }
}

setInterval(menu, 16)
