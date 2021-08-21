class Vector2 {
  x = NaN
  y = NaN
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }
  static plus(vec1 = new Vector2(), vec2 = new Vector2()) {
    if(vec2.x && vec.y)return new Vector2(vec1.x + vec2.x, vec1.y + vec2.y)
    else return new Vector2(vec1.x + vec2, vec1.x + vec2)
  }
  static minus(vec1 = new Vector2(), vec2 = new Vector2()) {
    if(vec2.x && vec2.y)return new Vector2(vec1.x - vec2.x, vec1.y - vec2.y)
    else return new Vector2(vec1.x + vec2, vec1.x + vec2)
  }
  static multiply(vec1 = new Vector2(), vec2 = new Vector2()) {
    return new Vector2(vec1.x * vec2.x, vec1.y * vec2.y)
  }
  static scalar(vec1 = new Vector2(), vec2 = new Vector2()) {
    let scal = this.multiply(vec1, vec2)
    return scal.x + scal.y
  }
  static length(vec) {
    return Math.sqrt(Math.pow(vec.x, 2) + Math.pow(vec.y, 2))
  }
  static create(vecData = {x, y}) {
    return new Vector2(vecData.x, vecData.y)
  }
  static up(vec, v = 1) {
    return new Vector2(vec.x, vec.y+v)
  }
  static down(vec, v = 1) {
    return new Vector2(vec.x, vec.y-v)
  }
  static right(vec, v = 1) {
    return new Vector2(vec.x+v, vec.y)
  }
  static left(vec, v = 1) {
    return new Vector2(vec.x-v, vec.y)
  }
  static max(vec, v) {
    if(v.x && v.y) {
      return new Vector2(Math.max(vec.x, v.y), Math.max(vec.x, v.y))
    } else return new Vector2(Math.max(vec.x, v), Math.max(vec.x, v))
  }
  static min(vec, v) {
    if(v.x && v.y) {
      return new Vector2(Math.min(vec.x, v.y), Math.min(vec.x, v.y))
    } else return new Vector2(Math.min(vec.x, v), Math.min(vec.x, v))
  }
  static abs(vec) {
    return new Vector2(Math.abs(vec.x), Math.abs(vec.y))
  }
}