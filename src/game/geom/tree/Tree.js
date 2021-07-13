const { Point } = require("../Shapes")
const { Vector3 } = require("../Vector")

class Tree {
  root = new Point()
  maxDepth = NaN
  constructor(maxDepth = NaN) {
    this.maxDepth = maxDepth
  }
  findBox(box = new Box(), point = this.root) {
    let points = box.checkPointIn(point.position) ? [point] : []
    for(let i in point.nodes)
      if(point.nodes[i] != null) 
        points.push(...this.findBox(box, point.nodes[i]))
    return points
  }
  #getTree(point = this.root) {
    if(point.nodes.length < 1)return {data: point.data}
    let points = {}
    for(let i in point.nodes)
      if(point.nodes[i] != null) {
        points[i] = this.getTree(point.nodes[i])
        points[i].position = point.nodes[i].position
        points[i].data = point.nodes[i].data
        points[i].depth = point.nodes[i].depth
      }
    return points
  }
  #getAllPoints(point = this.root) {
    let points = [point]
    if(point.nodes.length < 1)return points
    for(let i in point.nodes)
      if(point.nodes[i] != 0)points.push(...this.#getAllPoints(point.nodes[i]))
    return points
  }
  get tree() {
    return this.#getTree()
  }
  get allPoints() {
    return this.#getAllPoints()
  }
  get Json() {
    let tree = {
      points: this.allPoints,
      size: this.size,
      box: this.box
    }
    tree.points.forEach((e, i) => {
      tree.points[i] = {
        position: e.position,
        data: e.data
      }
    })
    return tree
  }
}

module.exports = Tree