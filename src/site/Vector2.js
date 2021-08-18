class Vector2 {
  x = NaN
  y = NaN
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }
  static plus(vec1 = new Vector2(), vec2 = new Vector2()) {
    return new Vector2(vec1.x + vec2.x, vec1.x + vec2.x)
  }
  static minus(vec1 = new Vector2(), vec2 = new Vector2()) {
    return new Vector2(vec1.x - vec2.x, vec1.x - vec2.x)
  }
  static create(vecData = {x, y}) {
    return new Vector2(vecData.x, vecData.y)
  }
}