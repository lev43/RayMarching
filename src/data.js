const { QuadTree, Box, Point } = require("js-quadtree")
const Octree = require('./game/geom/tree/Octree.js')

new Octree(1, 2, 3)

class Point3D extends Point {
  z = 0
  constructor(x, y, z, data) {
    super(x, y, data)
    this.z = z
  }
}

// Paths
const src = __dirname
const assets = src + '/../assets'
const site = `${assets}/site`
const sprites = `${assets}/sprites`

// Constants
const host = 'localhost'
const port = '8080'
const worldSize = 10
const map = new QuadTree(new Box(-(worldSize / 2), 0, worldSize, worldSize))


module.exports = {
  src, assets, site, sprites, host, port, worldSize, map, Point3D
}