function normalAngle(x = 0) {
  return x + 360 * Math.ceil(-x / 360)
}

function getLens(objs, position) {
  return objs.sort((a, b) => a.len(position) - b.len(position))
}

function getMin(objs, position) {
  return objs.reduce((p = {}, v) => p.length < v.len(position) ? v : p)
}

function getIndexFromPos(pos, width) {
  let {x,y} = pos
  return ((y * (width * 4)) + (x * 4))
}

function vecMax(a, b) {
  return {x: Math.max(a.x, b.x), y: Math.max(a.y, b.y)}
}
function vecMin(a, b) {
  return {x: Math.min(a.x, b.x), y: Math.min(a.y, b.y)}
}
function fvecMax(a, b) {
  return {x: Math.max(a.x, b), y: Math.max(a.y, b)}
}
function fvecMin(a, b) {
  return {x: Math.min(a.x, b), y: Math.min(a.y, b)}
}

function vecAbs(a) {
  return {x: Math.abs(a.x), y: Math.abs(a.y)}
}

function getAngleFrom2Point(a, b) {
  let c = Vector2.minus(b, a)

  return Math.atan2(c.y, c.x) * (180 / Math.PI)
}