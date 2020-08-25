import { createFullDocumentCanvas } from '../../createFullDocumentCanvas.js'
import { loadImage } from '../../loadImage.js'

export class Renderer {
  constructor (root, map) {
    this.root = root
    this.map = map
    this.imageCache = new Map()
  }

  async initialize () {
    const { canvas, context } = createFullDocumentCanvas()
    this.canvas = canvas
    this.context = context
    this.root.innerHTML = ''
    this.root.appendChild(this.canvas)
  }

  async render () {
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
    const image = await this._loadImage(tile.path)
    this.context.drawImage(
      image,
      x,
      y,
      this.map.tileWidth,
      this.map.tileHeight,
    )
  }

  async _renderTileGrid () {
    this.context.save()
    this.context.strokeStyle = 'rgba(0, 0, 0, 0.03)'
    for (let row = 0; row < this.map.height; row++) {
      for (let column = 0; column < this.map.width; column++) {
        this._renderTileGridCell(row, column)
      }
    }
    this.context.restore()
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
    for (const object of this.map.objects.reverse()) {
      await this._renderGameObject(object)
    }
  }

  async _renderGameObject (object) {
    const image = await this._loadImage(object.sprite.path)
    this.context.drawImage(
      image,
      object.boundingBox.x - object.origin.x,
      object.boundingBox.y - object.origin.y,
      object.boundingBox.width,
      object.boundingBox.height,
    )
  }

  async _loadImage (path) {
    if (this.imageCache.has(path)) {
      return this.imageCache.get(path)
    } else {
      const image = await loadImage(path)
      this.imageCache.set(path, image)
      return image
    }
  }
}
