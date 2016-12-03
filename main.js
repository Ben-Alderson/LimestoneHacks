var canvas = document.getElementById("canvas")
var ctx = canvas.getContext('2d')

var citizens = [];
citizens.push(new Citizen())

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for(var c of citizens) {
    c.draw()
  }
}

setInterval(draw, 16)
