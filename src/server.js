const DATA = require('./data.js')
const {port, host, assets, map} = DATA
const http = require('http')
const WebSocket = require('ws')
const fs = require('fs')
let cache = new Map()

const server = http.createServer(function(req, res){
  console.log(assets + req.url)
  res.writeHead(200, {"Content-Type": "text/" + req.url.split('.').pop()})
  if(cache.has(req.url)) {
    let data = cache.get(req.url)
    res.writeHead(200, {"Content-Type": data.type})
    res.end(data.content)
  }
  if(DATA[req.url.slice(1)]){
    res.writeHead(200, {"Content-Type": "text/plain"})
    res.end(JSON.stringify(DATA[req.url.slice(1)]))
    cache.set(req.url, {type: "text/plain", content: JSON.stringify(DATA[req.url.slice(1)])})
    return
  }
  fs.readFile(assets + req.url, (err, file) => {
    if(!err) {
      res.end(file)
      cache.set({type: "text/" + req.url.split('.').pop(), content: file})
    } else {
      res.writeHead(200, {"Content-Type": "text/html"})
      res.end(fs.readFileSync(assets + "/site/index.html"))
    }
  })
})

const wss = new WebSocket.Server({ server });

wss.on('error', (err) => {
  if(err.code === 'EADDRINUSE')console.log('Порт занят')
  else throw err
  process.exit(0)
})

wss.on('connection', function connection(ws, request, client) {
  ws.on('message', function incoming(message) {
    message = JSON.parse(message)

    let {type, content, data} = message

    // console.log(type, content)


    switch(type){
      case 'get':
        if(content == 'map') {
          ws.send(JSON.stringify({type: 'data', content: `map:${JSON.stringify(map)}`}))
        } else
          if(cache.has(content)) {
            ws.send(JSON.stringify({type: 'data', content: `${content}:${cache.get(content).content}`}))
          } else {
            ws.send(JSON.stringify({type: 'data', content: `${content}:${JSON.stringify(global[content])}`}))
            cache.set(content, {type: "text/plain", content: JSON.stringify(global[content])})
          }
        break
      case 'setBlock':
        let {x, y} = data
        map[y][x] = content == 'grass' ? {sprite: 'grass', path: '/sprites/ground/grass.png'} : {sprite: 'stone', path: '/sprites/ground/stone.jpeg'}
    }
  //     case 'player-message':
  //       log(JSON.stringify(data), 'messages-' + Game.id.get(data.password), 'messages')
  //       if(content.length > 0)Game.player(data.password, content, data.language)
  //       break;

  //     case 'player-key':
  //       let id = Game.id.get(content)
  //       if(!id){
  //         id = Game.generateID(content)
  //         log(`New player on id <${id}>`, 'sockets', 'connections')
  //       }

  //       if(Game.users.has(id)){
  //         ws.send(jsonToStr({type: 'err', content: 'Этим персонажем уже играют'}))
  //         ws.close()

  //       }else{
  //         ws.send = new Proxy(ws.send, {
  //           apply(fun, obj, args){
  //             let msg = args[0]
  //             let myID, entity


  //             Game.entity.forEach((_, id) => {
  //               if(Game.users.get(id) === obj){
  //                 myID = id
  //                 entity = _
  //             }})
  //             while((msg.content?.indexOf('\\n') ?? -1) != -1)
  //               msg.content = msg.content.replace('\\n', '\n')
  //             while((msg.content?.indexOf('%id{') ?? -1) != -1){
  //               let id = msg.content.slice(msg.content.search('%id{')+4, msg.content.search('}%id'))
  //               try{
  //                 let index = [...Game.entity.getByParameters({location: entity.location, id: myID, id_not: true}).keys()].findIndex(v => v == id) + 1
  //                 let nick = (Game.nickname.get(myID)?.[id] ?? Bundle[entity.language].names[Game.entity.get(id)?.brieflyAppearance] ?? id)
  //                 msg.content = msg.content.slice(0, msg.content.search('%id{')) + nick + (index ? `(${index})` : '') + msg.content.slice(msg.content.search('}%id') + 4)
  //               }catch(err){
  //                 if(err.message != 'Invalid string length')throw err
  //               }
  //             }

  //             if(!msg.id)throw new Error('Not id')

  //             fun.bind(obj)(JSON.stringify(msg))
  //           }
  //         });
  //         Game.users.set(id, ws)
  //         log(`Socket(${request.connection.remoteAddress})[${id}] connect`, 'sockets', 'connections')

  //         function close(){
  //           log(`Socket(${request.connection.remoteAddress})[${id}] disconnect`, 'sockets', 'connections')
  //           Game.users.delete(id)
  //           if(Game.entity.get(id)?.training > 0){
  //             [...Game.events.values()].find(e => e.id == id && e.type == 'training-end1')?.end();
  //             [...Game.events.values()].find(e => e.id == id && e.type == 'training-end2')?.end()
  //             Game.entity.delete(id)
  //           }
  //         }
  //         ws.on('close', close)
  //         let entity = Game.entity.get(id)
  //         if(entity){ 
  //           entity.language = data.language
  //           ws.send({type: 'msg', id: 'SERVER', content:
  //             f.s(
  //               Bundle[data.language].events.connect,
  //               id,
  //               Game.location.get(entity?.location)?.name[data.language] ?? Game.location.get(Game.location.spawn)?.name[data.language]
  //             )
  //           })
  //           if(entity.type == 'corpse'){
  //             entity.send({type: 'msg', id: id, content: Bundle[data.language].events.dead})
  //             entity.send({type: 'status', id: id, send: false, view: false})
  //           }
  //         } else Game.entity.add({id, training: 1, language: data.language})
  //       }
  //       break;

  //     default:
  //       con(message)
  //   }
  });

  ws.on('pong', msg => {})
});

server.listen(port, host, () => {
  console.log(`Start server on http://${host}:${port}`)
});