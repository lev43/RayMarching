class Ray {
  static minStep = 1
  static hitDistance = 1
  static maxIterations = 100
  static maxDistance = 10000
  position = new Vector2
  angle = NaN
  i = NaN
  border={x:NaN,y:NaN}
  constructor(position = new Vector2, angle = 0, border = {x,y}) {
    this.position.x = position.x
    this.position.y = position.y
    this.angle = angle
    this.i = 0
    this.border = border
  }
  go(len = 0) {
    this.i++
    if(len < Ray.minStep)len = Ray.minStep
    this.position.x += len * Math.cos(this.angle)
    this.position.y += len * Math.sin(this.angle)
    return len
  }
  checkHit(len) {
    if(len <= Ray.hitDistance)return 1
    if(this.i > Ray.maxIterations || len > Ray.maxDistance ||
      (this.border.x && this.position.x > this.border.x) ||
      (this.border.y && this.position.y > this.border.y)
    )return -1
    return 0
  }
}

class Camera {
  static step = 0.1
  constructor(position = new Vector2(0, 0)) {
    this.position = position
  }
  position = new Vector2()
  async draw(ctx = new CanvasRenderingContext2D(), objs, clear = true) {
    let image = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height),
    data = image.data
    if(clear)for(let i = 0; i < data.length; i += 4)[data[i], data[i+1], data[i+2], data[i+3]] = [0,0,0,0]
    
    for(let angle = 0; angle < 360; angle += Camera.step) {
      let ray = new Ray(this.position, angle, {x: image.width, y: image.height})
      let hit = 0
      while((hit = ray.checkHit(ray.go(getLens(objs, ray.position)[0].length))) == 0) {}
      let color = getLens(objs, ray.position)[0].color ?? {r:0,g:0,b:0,a:0}

      if(hit == 1) {
        let {x, y} = ray.position
        x = Math.round(x) - 1
        y = Math.round(y) - 1
        data[(x + y * image.width) * 4    ] = color.r ?? 0
        data[(x + y * image.width) * 4 + 1] = color.g ?? 0
        data[(x + y * image.width) * 4 + 2] = color.b ?? 0
        data[(x + y * image.width) * 4 + 3] = color.a ?? 0
      }
    }
    ctx.putImageData(image, 0, 0)
  }
}