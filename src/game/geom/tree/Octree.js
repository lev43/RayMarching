const {Point} = require("../Shapes");
const { Vector3 } = require("../Vector");
const Tree = require("./Tree");

class Octree extends Tree {
  root = new Point(new Vector3(0, 0, 0)).setDepth(0)
  add(point) {
    let parent = this.root
    let {x, y, z} = point.position
    while(1) {
      if(parent.depth >= this.maxDepth)return false
      if(x == parent.position.x && y == parent.position.y && z == parent.position.z) return false
      
      let right = 0+(x > parent.position.x)
      let up = 0+(y > parent.position.y)
      let forward = 0+(z > parent.position.z)

      let pos = forward << 2 | up << 1 | right

      if(parent.nodes[pos]) parent = parent.nodes[pos]
      else return parent.nodes[pos] = point.setDepth(parent.depth + 1)
    }
  }
  get(position) {
    let {x, y, z} = position, point = this.root
    while(1) {
      let {x: px, y: py, z: pz} = point.position

      if(x == px && y == py && z == pz)return point

      let right = 0+(x > px)
      let up = 0+(y > py)
      let forward = 0+(z > pz)

      let pos = forward << 2 | up << 1 | right

      if(!point.nodes[pos])return false
      else point = point.nodes[pos]
    }
  }
  static parse(JsonTree) {
    let tree = new Octree(JsonTree.maxDepth)
    JsonTree.points.forEach(e => {
      tree.add(new Point(Vector3.create(e.position)).setData(e.data))
    })
    return tree
  }
}

module.exports = Octree