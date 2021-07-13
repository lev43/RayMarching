const {Point, Box} = require("../Shapes");
const {Vector1} = require("../Vector");
const Tree = require("./Tree");

class BinaryTree extends Tree {
  root = new Point(new Vector1(0)).setDepth(0)
  constructor(){super(...arguments)}
  add(point) {
    let parent = this.root
    let {x} = point.position
    while(1) {
      if(parent.depth >= this.maxDepth)return false
      if(x == parent.position.x) return false
      
      let right = 0+(x > parent.position.x)

      if(parent.nodes[right]) parent = parent.nodes[right]
      else return parent.nodes[right] = point.setDepth(parent.depth + 1)
    }
  }
  get(pos) {
    let {x} = pos, point = this.root
    while(1) {
      let {x: px} = point.position

      if(x == px)return point

      let right = 0+(x > px)

      if(!point.nodes[right])return false
      else point = point.nodes[right]
    }
  }
  static parse(JsonTree) {
    let tree = new BinaryTree(JsonTree.maxDepth)
    JsonTree.points.forEach(e => {
      tree.add(new Point(Vector1.create(e.position)).setData(e.data))
    })
    return tree
  }
}

module.exports = BinaryTree