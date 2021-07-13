console.log('start')
var canvas = document.getElementById('TEST');
var ctx = canvas.getContext('2d');
var ws = new WebSocket(`ws://localhost:8080`);


console.log('settings')
document.body.style.margin = '0px';
canvas.style.height = document.body.style.height = '100%';
canvas.style.width = document.body.style.width = '100%';
let sizeX = canvas.offsetHeight, sizeY = canvas.offsetWidth
ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;


console.log('variables')
window.request = new XMLHttpRequest();
const tileSize = 30
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

events.on('start', () => {
  canvas.onclick = canvas.oncontextmenu = canvas.onmousemove = handler;

  function handler(event) {
    let {type, pageX, pageY, which} = event;
    let k = 0.3333333333333
    let x = Math.floor(pageX / (sizeX / (tileSize * k))), y = Math.floor(pageY / (sizeY / (tileSize * k)))
    let tile = null

    // console.log(event)
    // console.log(pageX, pageY, which)
    if(which == 1)tile = 'grass'
    if(which == 3)tile = 'stone'
    if(tile){
      send('setBlock', tile, {x, y})
      // console.log(map[y][x].sprite, '=>', tile, x, y, pageX / (sizeX / (tileSize * k)), pageY / (sizeY / (tileSize * k)), (tileSize * k))
    }
    return false
  }

  
  update = setInterval(() => events.emit('update'), 100)
})

events.on('update', () => {
  sizeX = canvas.offsetHeight, sizeY = canvas.offsetWidth
  send('get', 'map')
  for(let y = 0; y < map.length; y += 1) {
    for(let x = 0; x < map[y].length; x += 1) {
      let image = map[y][x].path
      if(!cache[image]) {
        let img = new Image();   // Создаёт новое изображение
        img.onload = function() {
          ctx.drawImage(img, x * tileSize, y * tileSize, tileSize, tileSize);
          cache[image] = img
        };
        img.src = image; // Устанавливает источник файла
      } else ctx.drawImage(cache[image], x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }
})

function send(type, content, data = {}) {
  ws.send(JSON.stringify({type, content, data}))
}
function whenWillMessageArrive(callback = ()=>{}) {
  let f = ws.onmessage
  ws.onmessage = (message) => {
    f(message)
    ws.onmessage = f
    callback()
  }
}


console.log('events')
ws.onclose = () => {console.log("WebSocket close")}
ws.onerror = (err) => {throw err}
ws.onmessage = (message) => {
  let {type, content} = JSON.parse(message.data)
  // console.log(type, content)
  switch(type) {
    case 'data':
      let data = JSON.parse(content.split(':').slice(1).join(':'))
      window[content.split(':').shift()] = data
  }
}
ws.onopen  = () => {
  console.log("Start ws")
  console.log('request')
    whenWillMessageArrive(async() => {
      events.emit('start')
  })
  send('get', 'map')
}