import { createFullDocumentCanvas } from '../../createFullDocumentCanvas.js'
import { loadImage } from '../../loadImage.js'

export class Renderer {
  constructor (root, map) {
    this.root = root
    this.map = map
  }

  async render () {
    const { canvas, context } = createFullDocumentCanvas()
    this.canvas = canvas
    this.context = context
    this.root.innerHTML = ''
    this.root.appendChild(this.canvas)

    await this._renderTiles()
    // await this._renderTileGrid()
    await this._renderGameObjects()
  }

  async _renderTiles () {
    for (let row = 0; row < this.map.height; row++) {
      for (let column = 0; column < this.map.width; column++) {
        const tile = this.map.grid.get({
          row: row + 1,
          column: column + 1,
        })
        await this._renderTile(row, column, tile)
      }
    }
  }

  async _renderTile (row, column, tile) {
    const x = column * this.map.tileWidth
    const y = row * this.map.tileHeight
    const image = await loadImage(tile.path)
    this.context.drawImage(
      image,
      x,
      y,
      this.map.tileWidth,
      this.map.tileHeight,
    )
  }

  async _renderTileGrid () {
    for (let row = 0; row < this.map.height; row++) {
      for (let column = 0; column < this.map.width; column++) {
        this._renderTileGridCell(row, column)
      }
    }
  }

  async _renderTileGridCell (row, column) {
    const x = column * this.map.tileWidth
    const y = row * this.map.tileHeight
    this.context.beginPath()
    this.context.rect(
      x,
      y,
      this.map.tileWidth,
      this.map.tileHeight,
    )
    this.context.stroke()
  }

  async _renderGameObjects () {
    for (const object of this.map.objects) {
      const image = await loadImage(object.sprite.path)
      this.context.drawImage(
        image,
        object.boundingBox.x,
        object.boundingBox.y,
        object.boundingBox.width,
        object.boundingBox.height,
      )
    }
  }
}
