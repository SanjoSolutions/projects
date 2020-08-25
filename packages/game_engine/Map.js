import { Grid } from '../../Grid.js'
import { TILE_HEIGHT, TILE_WIDTH } from './config.js'

export class Map {
  constructor (width, height, values = undefined) {
    this.width = width
    this.height = height
    this.tileWidth = TILE_WIDTH
    this.tileHeight = TILE_HEIGHT
    this.grid = new Grid(width, height, values)
    this.objects = []
  }

  addObject (object) {
    this.objects.push(object)
  }

  calculateWidthInPixels () {
    return this.width * this.tileWidth
  }

  calculateHeightInPixels () {
    return this.height * this.tileHeight
  }
}
