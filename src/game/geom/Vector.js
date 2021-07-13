class Vector {
  static plus(a, b) {
    return new a.__proto__.constructor(a.x + b.x, a.y + b.y, a.z + b.z)
  }
  static minus(a, b) {
    return new a.__proto__.constructor(a.x - b.x, a.y - b.y, a.z - b.z)
  }
  static divide(a, b) {
    return new a.__proto__.constructor(a.x / b.x, a.y / b.y, a.z / b.z)
  }
  static multiply(a, b) {
    return new a.__proto__.constructor(a.x * b.x, a.y * b.y, a.z * b.z)
  }
  static equal(a, b) {
    return (
      (isNaN(a.x) ? 0 : a.x) == (isNaN(b.x) ? 0 : b.x)
      &&
      (isNaN(a.y) ? 0 : a.y) == (isNaN(b.y) ? 0 : b.y)
      &&
      (isNaN(a.z) ? 0 : a.z) == (isNaN(b.z) ? 0 : b.z)
    )
  }
}

class Vector1 {
  constructor(x){
    this.x = x
  }
  static create(obj) {
    return new Vector1(obj.x)
  }
}

class Vector2 {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  static create(obj) {
    return new Vector2(obj.x, obj.y)
  }
}

class Vector3 {
  constructor(x, y, z) {
    this.x = x
    this.y = y
    this.z = z
  }
  static create(obj) {
    return new Vector3(obj.x, obj.y, obj.z)
  }
}

module.exports = {
  Vector,
  Vector1,
  Vector2,
  Vector3
}