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