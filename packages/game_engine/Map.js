import { Grid } from '../../Grid.js'

export class Map {
  constructor (width, height, values = undefined) {
    this.width = width
    this.height = height
    this.tileWidth = 32
    this.tileHeight = 32
    this.grid = new Grid(width, height, values)
    this.objects = []
  }

  addObject (object) {
    this.objects.push(object)
  }
}
