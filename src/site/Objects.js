class Collider {
  len(centree, p) {
    return Math.sqrt(
      Math.pow(centree.x - p.x, 2) + Math.pow(centree.y - p.y, 2)
    )
  }
}

class CIRCLE extends Collider {
  radius = NaN
  constructor(R = 0) {
    super()
    this.radius = R
  }
  len(centree = new Vector2, p = new Vector2) {
    return super.len(centree, p) - this.radius
  }
}


class Object {
  position = new Vector2(0, 0)
  collider = new Collider
  color = {r:0,g:0,b:0,a:0}
  length = NaN
  constructor(position = this.position, collider = this.collider, color = this.color) {
    this.position = position
    this.collider = collider
    this.color = color
  }
  len(p = new Vector2) {
    return this.length = this.collider.len(this.position, p)
  }
}