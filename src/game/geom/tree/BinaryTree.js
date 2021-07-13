const {Point, Box} = require("../Shapes");
const { Vector1, Vector } = require("../Vector");

class BinaryTree {
  nodes = []
  root = new Point(new Vector1(0), 0)
  box = new Box()
  size = new Vector1(0)
  maxDepth = NaN
  constructor(box, maxDepth = NaN) {
    this.maxDepth = maxDepth
    this.box = box
    this.size = new Vector1(box.x2 - box.x1)
    this.root = new Point(new Vector1(this.box.x2 / 2), 0).setBox(box).setDepth(0)
  }
  add(point) {
    let parent = this.root
    // console.log(this.box.checkPointIn(point.position), point.position)
    if(!this.box.checkPointIn(point.position))return false
    let {x} = point.position
    while(1) {
      let right

      if(x == parent.position.x) return parent

      if(x > parent.position.x) right = 1
      else right = 0

      let pos = new Vector1(
        Math.floor(((right ? this.box.x2 : parent.position.x) - (this.size.x / ((parent.depth + 1) * 4))))
      )

      if(parent.nodes[right]) parent = parent.nodes[right]
      else if(point.itPos(pos)) {
        console.log(
          pos, new Vector1(this.size.x / ((parent.depth + 1) * 4)),
          Vector.minus(pos, new Vector1(this.size.x / ((parent.depth + 1) * 4))),
          Vector.plus(pos, new Vector1(this.size.x / ((parent.depth + 1) * 4))),
          parent.depth + 1
        )
        parent.nodes[right] = point
          .setDepth(parent.depth + 1)
          .setParent(parent)
          .setBox(new Box(Vector.minus(pos, new Vector1(this.size.x / ((parent.depth + 1) * 4))), Vector.plus(pos, new Vector1(this.size.x / ((parent.depth + 1) * 4)))))
        return parent.nodes[right]
      } else {
        parent = parent.nodes[right] = new Point(pos)
          .setDepth(parent.depth + 1)
          .setParent(parent)
          .setBox(new Box(Vector.minus(pos, new Vector1(this.size.x / ((parent.depth + 1) * 4))), Vector.plus(pos, new Vector1(this.size.x / ((parent.depth + 1) * 4)))))
        // console.log(point.position, parent.position)
        if(parent.depth >= this.maxDepth)return parent
      }
    }
  }
  get(pos, point = this.root) {
    const {x} = pos, {x: px} = point.position
    // console.log(x, px)
    if(x == px)return point
    let right

    if(x > px) right = 1
    else right = 0

    if(!point.nodes[right])return false
    return this.get(pos, point.nodes[right])
  }
  findBox(box, point = this.root) {
    // console.log(pos1.x, pos2.x, point.position.x)
    if(
      box.checkPointIn(point.position)
    )return [point]

    let points = []
    for(let i in point.nodes)
      if(point.nodes[i] != null) 
        points.push(...this.findBox(box, point.nodes[i]))
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
  static parse(JsonTree) {
    let tree = new BinaryTree(Box.create(JsonTree.box))
    JsonTree.points.forEach(e => {
      tree.add(new Point(Vector1.create(e.position)).setData(e.data))
    })
    return tree
  }
}

module.exports = BinaryTree