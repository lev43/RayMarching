const {Point} = require("../Shapes");
const { Vector2 } = require("../Vector");

class QuadTree {
  nodes = []
  root = new Point()
  size = new Vector2()
  constructor(size) {
    this.size = size
    this.root = new Point(new Vector2(size.x / 2, size.y / 2), 0)
  }
  add(point) {
    let parent = this.root
    let {x, y} = point.position
    if(
      x < 0 || x > this.size.x
      ||
      y < 0 || y > this.size.y
    )return false
    while(1) {
      let right, up, {x: px, y: py} = parent.position

      if(x == px && y == py) return parent

      if(x > px) right = 1
      else right = 0
      if(y > py) up = 1
      else up = 0

      let pos = up << 1 | right

      if(parent.nodes[pos]) parent = parent.nodes[pos]
      else {
        parent.nodes[pos] = point.setDepth(parent.depth + 1).setParent(parent)
        return parent.nodes[pos]
      }
    }
  }
  get(pos, point = this.root) {
    const {x, y} = pos, {x: px, y: py} = point.position
    // console.log(x, px)
    if(x == px && y == py)return point
    let right, up

    if(x > px) right = 1
    else right = 0
    if(y > py) up = 1
    else up = 0

    let _pos = y << 1 | x

    if(!point.nodes[_pos])return false
    return this.get(pos, point.nodes[_pos])
  }
  findBox(pos1, pos2, point = this.root) {
    // console.log(pos1.x, pos2.x, point.position.x)
    if(
      point.position.x + this.size.x / (point.depth * 4) >= pos1.x
      &&
      point.position.x - this.size.x / (point.depth * 4) <= pos2.x
      &&
      point.position.y + this.size.y / (point.depth * 4) >= pos1.y
      &&
      point.position.y - this.size.y / (point.depth * 4) <= pos2.y
    )return [point]

    let points = []
    for(let i in point.nodes)
      if(point.nodes[i] != null) 
        points.push(...this.findBox(pos1, pos2, point.nodes[i]))
    return points
  }
  getTree(point = this.root) {
    // console.log(point.nodes)
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
  getAllPoints(point = this.root) {
    let points = [point]
    if(point.nodes.length < 1)return points
    for(let i in point.nodes)
      if(point.nodes[i] != 0)points.push(...this.getAllPoints(point.nodes[i]))
    return points
  }
  Json() {
    let tree = {
      points: this.getAllPoints(),
      size: this.size
    }
    tree.points.forEach((e, i) => {
      tree.points[i] = {
        position: e.position,
        data: e.data
      }
    })
    return tree
  }
  static parse(JsonTree) {
    let tree = new QuadTree(Vector2.create(JsonTree.size))
    JsonTree.points.forEach(e => {
      tree.add(new Point(Vector2.create(e.position)).setData(e.data))
    })
    return tree
  }
}

module.exports = QuadTree