const {sqrt, pow} = Math

class Collider {
  len(centree, p) {
    return sqrt(
      pow(centree.x - p.x, 2) + pow(centree.y - p.y, 2)
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

class QUAD extends Collider {
  size = NaN
  constructor(s = 0, angle = 0) {
    super()
    this.size = s
    this.angle = angle
  }
  len(centree = new Vector2, p = new Vector2) {
    p = Vector2.minus(p, centree)
    let d = new Vector2(Math.abs(p.x) - this.size, Math.abs(p.y) - this.size)
    let l = Math.sqrt(Math.max(d.x, 0) * Math.max(d.x, 0) + Math.max(d.y, 0) * Math.max(d.y, 0));
    return l + Math.min(Math.max(d.x, d.y), 0);
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