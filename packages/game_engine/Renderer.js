import { createFullDocumentCanvas } from "../../createFullDocumentCanvas.js"
import { loadImage } from "../../loadImage.js"

export class Renderer {
  constructor(root, map) {
    this.root = root
    this.map = map
    this.imageCache = new Map()
  }

  async initialize() {
    const { canvas, context } = createFullDocumentCanvas()
    this.canvas = canvas
    this.context = context
    this.root.innerHTML = ""
    this.root.appendChild(this.canvas)
  }

  async render() {
    await this._renderTiles()
    // await this._renderTileGrid()
    await this._renderGameObjects()
    await this._clearAreaOutsideOfMap()
  }

  async _renderTiles() {
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

  async _renderTile(row, column, tile) {
    const x = column * this.map.tileWidth
    const y = row * this.map.tileHeight
    const image = await this._loadImage(tile.path)
    this.context.drawImage(image, x, y, this.map.tileWidth, this.map.tileHeight)
  }

  async _renderTileGrid() {
    this.context.save()
    this.context.strokeStyle = "rgba(0, 0, 0, 0.03)"
    for (let row = 0; row < this.map.height; row++) {
      for (let column = 0; column < this.map.width; column++) {
        this._renderTileGridCell(row, column)
      }
    }
    this.context.restore()
  }

  async _renderTileGridCell(row, column) {
    const x = column * this.map.tileWidth
    const y = row * this.map.tileHeight
    this.context.beginPath()
    this.context.rect(x, y, this.map.tileWidth, this.map.tileHeight)
    this.context.stroke()
  }

  async _renderGameObjects() {
    for (let index = this.map.objects.length - 1; index >= 0; index--) {
      const object = this.map.objects[index]
      await this._renderGameObject(object)
    }
  }

  async _renderGameObject(object) {
    if (this._isGameObjectInMap(object)) {
      const image = await this._loadImage(object.sprite.path)
      this.context.drawImage(
        image,
        object.boundingBox.x,
        object.boundingBox.y,
        object.boundingBox.width,
        object.boundingBox.height
      )
    }
  }

  _isGameObjectInMap(object) {
    const ox = object.boundingBox.x
    const oy = object.boundingBox.y
    const ow = object.boundingBox.width
    const oh = object.boundingBox.height
    const w = this.map.calculateWidthInPixels()
    const h = this.map.calculateHeightInPixels()
    return ox >= -ow && ox < w && oy >= -oh && oy < h
  }

  async _loadImage(path) {
    if (this.imageCache.has(path)) {
      return this.imageCache.get(path)
    } else {
      const image = await loadImage(path)
      this.imageCache.set(path, image)
      return image
    }
  }

  _calculateCanvasWidth() {
    return this.canvas.width / window.devicePixelRatio
  }

  _calculateCanvasHeight() {
    return this.canvas.height / window.devicePixelRatio
  }

  async _clearAreaOutsideOfMap() {
    const mapWidth = this.map.calculateWidthInPixels()
    const mapHeight = this.map.calculateHeightInPixels()
    const canvasWidth = this._calculateCanvasWidth()
    const canvasHeight = this._calculateCanvasHeight()
    this.context.clearRect(mapWidth, 0, canvasWidth - mapWidth, canvasHeight)
    this.context.clearRect(0, mapHeight, mapWidth, canvasHeight - mapHeight)
  }
}
