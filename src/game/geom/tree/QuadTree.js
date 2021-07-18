const {Point} = require("../Shapes");
const { Vector2 } = require("../Vector");
const Tree = require("./Tree");

class QuadTree extends Tree {
  root = new Point(new Vector2(0, 0)).setDepth(0)
  add(point) {
    let parent = this.root
    let {x, y} = point.position
    while(1) {
      if(parent.depth >= this.maxDepth)return false
      if(x == parent.position.x && y == parent.position.y) return false
      
      let right = 0+(x > parent.position.x)
      let up = 0+(y > parent.position.y)

      let pos = up << 1 | right

      if(parent.nodes[pos]) parent = parent.nodes[pos]
      else return parent.nodes[pos] = point.setDepth(parent.depth + 1)
    }
  }
  get(pos) {
    let {x, y} = pos, point = this.root
    while(1) {
      let {x: px, y: py} = point.position

      if(x == px && y == py)return point

      let right = 0+(x > px)
      let up = 0+(y > py)

      let pos = up << 1 | right

      if(!point.nodes[pos])return false
      else point = point.nodes[pos]
    }
  }
  static parse(JsonTree) {
    let tree = new QuadTree(JsonTree.maxDepth)
    JsonTree.points.forEach(e => {
      tree.add(new Point(Vector2.create(e.position)).setData(e.data))
    })
    return tree
  }
}

module.exports = QuadTree