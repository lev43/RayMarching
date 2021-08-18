const DATA = require('../data.js')
const {port, host, root, site} = DATA
const http = require('http')
const fs = require('fs')
let cache = new Map()

const server = http.createServer(function(req, res){
  console.log(req.url)
  res.writeHead(200, {"Content-Type": "text/" + (req.url.split('.').pop() == 'js' ? 'javascript' : req.url.split('.').pop())})
  if(cache.has(req.url)) {
    let data = cache.get(req.url)
    res.writeHead(200, {"Content-Type": data.type})
    res.end(data.content)
  }
  fs.readFile(root + req.url, (err, file) => {
    if(!err) {
      res.end(file)
      // cache.set({type: "text/" + req.url.split('.').pop(), content: file})
    } else {
      res.writeHead(200, {"Content-Type": "text/html"})
      res.end(fs.readFileSync(site + "/index.html"))
    }
  })
})

server.listen(port, host, () => {
  console.log(`Start server on http://${host}:${port}`)
});