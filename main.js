var canvas = document.getElementById("canvas")
var ctx = canvas.getContext('2d')

var citizens = [];
citizens.push(new Citizen())
var redCitizen = new Citizen();
redCitizen.team = "red";
redCitizen.x = 40;
citizens.push(redCitizen)

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for(var c of citizens) {
    c.draw()
  }
}

setInterval(draw, 16)
