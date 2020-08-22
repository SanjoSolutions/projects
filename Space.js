export class Space {
  constructor(viewport) {
    this._viewport = viewport
    this.data = new ArrayBuffer(this.width * this.height)
    this.view = new Uint8Array(this.data)
  }

  get viewport() {
    return this._viewport
  }

  get width() {
    return Math.ceil((this.viewport.maxX - this.viewport.minX + 1) / 8) * 8
  }

  get height() {
    return Math.ceil((this.viewport.maxY - this.viewport.minY + 1) / 8) * 8
  }

  _getIndex({x, y}) {
    const index = ((this.viewport.maxY - y) * this.width + (this.viewport.minX - x))
    const dataIndex = Math.floor(index / 8)
    const bitIndex = index % 8
    return {dataIndex, bitIndex}
  }

  get({x, y}) {
    if (
      x < this.viewport.minX ||
      x > this.viewport.maxX ||
      y < this.viewport.minY ||
      y > this.viewport.maxY
    ) {
      return false
    }
    const {dataIndex, bitIndex} = this._getIndex({x, y})
    return Boolean((this.view[dataIndex] >> bitIndex) & 1)
  }

  set({x, y}, value) {
    // TODO: Extend space when {x, y} outside of viewport
    const bit = value ? 1 : 0
    const {dataIndex, bitIndex} = this._getIndex({x, y})
    if (bit === 1) {
      this.view[dataIndex] = this.view[dataIndex] | (1 << bitIndex)
    } else if (bit === 0) {
      this.view[dataIndex] = this.view[dataIndex] & (0b11111111 ^ (1 << bitIndex))
    }
  }
}
