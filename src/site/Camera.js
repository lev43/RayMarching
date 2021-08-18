class Ray {
  static hitDistance = 0.1
  static maxIterations = 50
  static maxDistance = 100
  position = new Vector2
  angle = NaN
  i = NaN
  constructor(position = new Vector2, angle = 0) {
    this.position.x = position.x
    this.position.y = position.y
    this.angle = angle
    this.i = 0
  }
  go(len = 0) {
    this.i++
    this.position.x += len * Math.cos(this.angle)
    this.position.y += len * Math.sin(this.angle)
    return len
  }
  checkHit(len) {
    if(len <= Ray.hitDistance)return 1
    if(this.i > Ray.maxIterations)return -1
    return 0
  }
}

class Camera {
  static step = 0.5
  constructor(position = new Vector2(0, 0)) {
    this.position = position
  }
  position = new Vector2()
  async draw(ctx = new CanvasRenderingContext2D(), objs, clear = true) {
    let image = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height),
    data = image.data
    if(clear)for(let i = 0; i < data.length; i += 4)[data[i], data[i+1], data[i+2], data[i+3]] = [0,0,0,0]
    
    for(let angle = 0; angle < 360; angle += Camera.step) {
      let res = this.ray(angle, objs)
      if(res.hit == 1) {
        let {x, y} = res.position
        x = Math.round(x) - 1
        y = Math.round(y) - 1
        data[(x + y * image.width) * 4    ] = res.obj?.color.r ?? 0
        data[(x + y * image.width) * 4 + 1] = res.obj?.color.g ?? 0
        data[(x + y * image.width) * 4 + 2] = res.obj?.color.b ?? 0
        data[(x + y * image.width) * 4 + 3] = res.obj?.color.a ?? 0
      }
    }
    ctx.putImageData(image, 0, 0)
  }
  ray(angle, objs) {
    let ray = new Ray(this.position, angle)
    let hit = 0
    while((hit = ray.checkHit(ray.go(getLens(objs, ray.position)[0].length))) == 0) {}

    return {hit, position: ray.position, obj: hit == 1 ? getLens(objs, ray.position)[0] : null}
  }
}