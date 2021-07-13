const { Vector3, Vector } = require("./Vector")

class Box {
  constructor(pos1 = new Vector3(), pos2 = new Vector3()) {
    this.x1 = pos1.x ?? NaN
    this.y1 = pos1.y ?? NaN
    this.z1 = pos1.z ?? NaN

    this.x2 = pos2.x ?? NaN
    this.y2 = pos2.y ?? NaN
    this.z2 = pos2.z ?? NaN
  }
  checkPointIn(pos) {
    let {x, y, z} = pos
    let {x1, x2, y1, y2, z1, z2} = this
    // console.log(pos)
    // console.log(this)
    return (
      (isNaN(x1) || (x ?? 0) >= x1 && (x ?? 0) <= x2)
      &&
      (isNaN(y1) || (y ?? 0) >= y1 && (y ?? 0) <= y2)
      &&
      (isNaN(z1) || (z ?? 0) >= z1 && (z ?? 0) <= z2)
    )
  }
  checkBoxIn(box) {
    let {bx1, bx2, by1, by2, bz1, bz2} = box
    let {x1, x2, y1, y2, z1, z2} = this
    return (
      bx1 >= x1 && bx2 <= x2
      &&
      by1 >= y1 && by2 <= y2
      &&
      bz1 >= z1 && bz2 <= z2
    )
  }
  static create(obj) {
    let {x1, y1, z1, x2, y2, z2} = obj
    return new Box(new Vector3(x1, y1, z1), new Vector3(x2, y2, z2))
  }
}

class Point {
  nodes = []
  data = {}
  depth = NaN
  constructor(pos) {
    this.position = pos
  }
  setParent(parent) {
    this.parent = parent
    return this
  }
  setData(data) {
    this.data = data
    return this
  }
  setDepth(depth) {
    this.depth = depth
    return this
  }
  setNodes(nodes) {
    this.nodes = nodes
  }
  setBox(box = new Box()) {
    this.box = box
    return this
  }
  itPos(pos) {
    return Vector.equal(this, pos)
  }
}

module.exports = {
  Point,
  Box
}