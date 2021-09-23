import { Game } from './Game.js'
import { Map as GameEngineMap } from './Map.js'
import { Tile } from './Tile.js'

const sand = new Tile('images/tiles/sand.png')
const f = sand
const grass = new Tile('images/tiles/grass.png')
const g = grass
const map = new GameEngineMap(20, 12, {
  floor: [
    f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f,
    f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f,
    f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f,
    f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f,
    f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f,
    f, f, f, f, f, f, f, g, g, g, g, g, f, f, f, f, f, f, f, f,
    f, f, f, f, f, f, f, g, g, g, g, g, f, f, f, f, f, f, f, f,
    f, f, f, f, f, f, f, g, g, g, g, g, f, f, f, f, f, f, f, f,
    f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f,
    f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f,
    f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f,
    f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f,
  ],
})
const w = new Tile('images/tiles/wood_floor.png')
const map2 = new GameEngineMap(20, 12, {
  floor: [
    w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w,
    w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w,
    w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w,
    w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w,
    w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w,
    w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w,
    w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w,
    w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w,
    w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w,
    w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w,
    w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w,
    w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w,
  ],
})
const maps = [map, map2]
const game = new Game(document.body, maps)
game.initialize()
game.start()
