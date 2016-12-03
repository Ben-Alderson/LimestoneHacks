var canvas = document.getElementById("canvas")
var ctx = canvas.getContext('2d')

function intersects(a, b) {
  var dist = Math.pow(a.x-b.x,2)+Math.pow(a.y-b.y,2)
  return dist < Math.pow(a.size + b.size, 2)
}

var citizens = [];
citizens.push(new Citizen(40, 40))
citizens.push(new Leader(100, 40, "red"))

function mainLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  for(i = 0; i < citizens.length; i++) {
    for(j = i+1; j < citizens.length; j++) {
      console.log(intersects(citizens[i], citizens[j]))
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
