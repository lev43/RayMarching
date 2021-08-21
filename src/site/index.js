console.log('Load')
var canvas = document.getElementById('TEST');
var ctx = canvas.getContext('2d');
var host = 'localhost:8080'
let update


console.log('settings')
document.body.style.margin = '0px';
canvas.style.height = document.body.style.height = '100%';
canvas.style.width = document.body.style.width = '100%';
let sizeX = canvas.offsetHeight, sizeY = canvas.offsetWidth
let wsad = [0, 0, 0, 0]
ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

ctx.fillRect(0, 0, sizeX, sizeY)

var objs = [
  // new Object(new Vector2(0, 0), new CIRCLE(1), {r: 255, g: 0, b: 0, a: 255}),
  new Object(new Vector2(100, 100), new QUAD({x: 10, y: 10}, 45), {r: 255, g: 0, b: 0, a: 255}),
  new Object(new Vector2(100, 50), new CIRCLE(10), {r: 255, g: 255, b: 0, a: 255}),
  new Object(new Vector2(50, 50), new CIRCLE(10), {r: 255, g: 0, b: 255, a: 255}),
  new Object(new Vector2(150, 150), new CIRCLE(10), {r: 0, g: 0, b: 255, a: 255}),
  new Object(new Vector2(1500, 0), new CIRCLE(1000), {r: 0, g: 0, b: 0, a: 255}),
  new Object(new Vector2(50, 100), new QUAD({x: 10, y: 5}), {r: 0, g: 255, b: 0, a: 255})
]
// console.log(...getLens(objs, {x:0,y:0}))
console.log("angle:", getAngleFrom2Point({x: 1, y: 1}, {x:1, y: 2}))

console.log('variables')
window.request = new XMLHttpRequest();
window.map = null
window.cache = {}
window.update = null
class EventEmitter {
  events = new Map()
  on(name, f) {this.events.set(name, f)}
  off(name) {this.events.delete(name)}
  emit(name, ...parameters) {if(this.events.has(name))this.events.get(name)(...parameters)}
}

window.events = new EventEmitter()

let cam = new Camera()
let speed = 5

events.on('update', () => {
  // clearInterval(update)
  cam.draw(ctx, objs, true)
  ctx.beginPath()
  ctx.arc(cam.position.x, cam.position.y, 3, 0, 360)
  ctx.fill()

  if(wsad[0] && cam.position.y - speed >= 0)cam.position.y -= speed
  if(wsad[1] && cam.position.y + speed < canvas.height)cam.position.y += speed
  if(wsad[2] && cam.position.x - speed >= 0)cam.position.x -= speed
  if(wsad[3] && cam.position.x + speed < canvas.width)cam.position.x += speed
})

function getMousePos(canvas, event) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

canvas.width = canvas.clientWidth
canvas.height = canvas.clientHeight
window.onresize = () => {
  canvas.width = canvas.clientWidth
  canvas.height = canvas.clientHeight
}

canvas.onclick = (event) => {
  // let {x, y} = getMousePos(canvas, event)
  cam.position = getMousePos(canvas, event)
  return false
}
document.onkeydown = document.onkeyup = (e) => {
  switch(e.code) {
    case "ArrowUp":
    case "KeyW":
      wsad[0] = e.type == "keydown"
      break
    case "ArrowDown":
    case "KeyS":
      wsad[1] = e.type == "keydown"
      break
    case "ArrowLeft":
    case "KeyA":
      wsad[2] = e.type == "keydown"
      break
    case "ArrowRight":
    case "KeyD":
      wsad[3] = e.type == "keydown"
      break
  }
} 

ctx.clearRect(0, 0, sizeX, sizeY)


console.log('Start')
update = setInterval(() => events.emit('update'), 50)