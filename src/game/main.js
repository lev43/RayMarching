const { Point } = require("js-quadtree")
const { map, worldSize, Point3D } = require("../data")
for(let y = 0; y < worldSize; y++)
  for(let x = 0; x < worldSize; x++)
    map.insert(new Point3D(x, y, 0, ((x + y) % 2 == 0 ? {sprite: 'grass', path: '/sprites/ground/grass.png'} : {sprite: 'stone', path: '/sprites/ground/stone.jpeg'})))
    // map[i][j] = (j + i) % 2 == 0 ? {sprite: 'grass', path: '/sprites/ground/grass.png'} : {sprite: 'stone', path: '/sprites/ground/stone.jpeg'}