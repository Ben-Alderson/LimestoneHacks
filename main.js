var canvas = document.getElementById("canvas")
var ctx = canvas.getContext('2d')

var citizens = [];
citizens.push(new Citizen(40, 40))
citizens.push(new Leader(100, 40, "red"))

function mainLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for(var c of citizens) {
    c.update();
    c.draw()
  }
}

setInterval(mainLoop, 16)
