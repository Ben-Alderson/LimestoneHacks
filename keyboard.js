var keys = {}

window.onkeydown = function(e) {
  var key = e.keyCode ? e.keyCode : e.which
  keys[key] = true
}

window.onkeyup = function(e) {
  var key = e.keyCode ? e.keyCode : e.which
  keys[key] = undefined
}

function isKeyDown(key) {
  return keys[key]
}
