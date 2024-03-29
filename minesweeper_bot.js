bot = (function () {
  const defaultOptions = {
    flag: true,
    reveal: true,
    blacklist: true,
    whitelist: false,
  }
  let options = { ...defaultOptions }

  const MIN_NUMBER = 1
  const MAX_NUMBER = 8
  const NUMBER = series(MIN_NUMBER, MAX_NUMBER)
  const EXPLODED = 0
  const BLANK = 9
  const UNREVEALED = 10
  const WALL = 11
  const MIN_FLAG = 12

  class Grid {
    constructor(width, height, values = []) {
      this.width = width
      this.height = height
      this.values = values
    }

    get({ x, y }) {
      return this.values[this.positionToIndex({ x, y })]
    }

    set({ x, y }, value) {
      this.values[this.positionToIndex({ x, y })] = value
    }

    positionToIndex({ x, y }) {
      return y * this.width + x
    }

    indexToPosition(index) {
      const x = index % this.width
      const y = Math.floor(index / this.width)
      return { x, y }
    }

    minimum() {
      let minimum = null
      let minimumIndex = null
      this.values.forEach((value, index) => {
        if (
          typeof value !== "undefined" &&
          (minimum === null || value < minimum)
        ) {
          minimum = value
          minimumIndex = index
        }
      })
      return {
        value: minimum,
        position:
          minimumIndex === null ? null : this.indexToPosition(minimumIndex),
      }
    }

    every(iterator) {
      return this.values.every((value, index) => {
        const { x, y } = this.indexToPosition(index)
        return iterator(value, { x, y }, this)
      })
    }
  }

  const whitelist = new Grid(
    64,
    64,
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
      1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
  )
  function isOnWhitelist({ x, y }) {
    return Boolean(whitelist.get({ x, y }))
  }

  let isRunning = false
  let isIdle = false
  let shouldStop = false
  const clicked = new Grid(64, 64) // Does the width and height apply to all maps?
  const blacklist = new Grid(64, 64) // Does the width and height apply to all maps?
  const blacklistDuration = 10000
  function isOnBlacklist({ x, y }) {
    const timestamp = blacklist.get({ x, y })
    return timestamp && Date.now() - timestamp <= blacklistDuration
  }

  const minesweeper = window.appController.minesweeper

  /*
const _onFlaggedMiss = minesweeper.onFlaggedMiss
minesweeper.onFlaggedMiss = function (...args) {
    debugger
    _onFlaggedMiss(...args)
}

const _onTriggerMine = minesweeper.onTriggerMine
minesweeper.onTriggerMine = function (...args) {
    debugger
    _onTriggerMine(...args)
}
*/

  const _onCellChanged = minesweeper.onCellChanged
  minesweeper.onCellChanged = function (cells) {
    _onCellChanged(cells)
    const now = Date.now()
    for (const changedCell of cells) {
      if (!clicked.get(changedCell)) {
        const neighbours = minesweeper.playGrid.getNeighbors(
          changedCell.x,
          changedCell.y,
        )
        for (const neighbour of neighbours) {
          blacklist.set(neighbour, now)
        }
      }
    }
    resume()
  }

  window.appController.game.onPause.add(function pause() {
    isIdle = true
  })
  window.appController.game.onResume.add(resume)

  function resume() {
    if (isRunning && isIdle) {
      isIdle = false
      requestAnimationFrame(solveIteration)
    }
  }

  class Pattern extends Grid {
    constructor(width, height, values) {
      super(width, height, values)
      this.reveal = []
      this.flag = []
    }

    rotate() {
      const destinationWidth = this.height
      const destinationHeight = this.width
      const mapPosition = this.rotatePosition.bind(this)
      return this.transformPattern(
        destinationWidth,
        destinationHeight,
        mapPosition,
      )
    }

    rotatePosition({ x: sourceX, y: sourceY }) {
      const destinationWidth = this.height
      const destinationX = destinationWidth - 1 - sourceY
      const destinationY = sourceX
      return { x: destinationX, y: destinationY }
    }

    mirrorHorizontally() {
      const destinationWidth = this.width
      const destinationHeight = this.height
      const mapPosition = this.mirrorPosition.bind(this)
      return this.transformPattern(
        destinationWidth,
        destinationHeight,
        mapPosition,
      )
    }

    mirrorPosition({ x: sourceX, y: sourceY }) {
      const destinationWidth = this.width
      const destinationX = destinationWidth - 1 - sourceX
      const destinationY = sourceY
      return { x: destinationX, y: destinationY }
    }

    transformPattern(destinationWidth, destinationHeight, mapPosition) {
      const transformedPattern = new Pattern(
        destinationWidth,
        destinationHeight,
      )

      const values = new Array(this.values.length)
      for (let sourceY = 0; sourceY < this.height; sourceY++) {
        for (let sourceX = 0; sourceX < this.width; sourceX++) {
          const sourcePosition = { x: sourceX, y: sourceY }
          const destinationPosition = mapPosition(sourcePosition)
          const sourceIndex = this.positionToIndex(sourcePosition)
          const destinationIndex =
            transformedPattern.positionToIndex(destinationPosition)
          values[destinationIndex] = this.values[sourceIndex]
        }
      }
      transformedPattern.values = values

      for (const position of this.reveal) {
        transformedPattern.reveal.push(mapPosition(position))
      }

      for (const position of this.flag) {
        transformedPattern.flag.push(mapPosition(position))
      }

      return transformedPattern
    }
  }

  function getEffectiveNumber({ x, y }) {
    const number = minesweeper.playGrid.get(x, y)
    let effectiveNumber
    if (NUMBER.includes(number)) {
      const neighbours = minesweeper.playGrid.getNeighbors(x, y)
      effectiveNumber = number - getNumberOfNeighbouringMines(neighbours)
    } else {
      effectiveNumber = number
    }
    return effectiveNumber
  }

  const includesConstant =
    (constants) =>
    ({ x, y }) => {
      const number = getEffectiveNumber({ x, y })
      return constants.includes(number)
    }
  const constant = (constant) => includesConstant([constant])
  const unrevealed = () => constant(UNREVEALED)
  const blankWallOrNumber = () => includesConstant(NUMBER.concat([BLANK, WALL]))

  const patterns = []

  const pattern1 = new Pattern(4, 3, [
    blankWallOrNumber(),
    blankWallOrNumber(),
    blankWallOrNumber(),
    blankWallOrNumber(),
    blankWallOrNumber(),
    constant(1),
    constant(1),
    blankWallOrNumber(),
    blankWallOrNumber(),
    unrevealed(),
    unrevealed(),
    unrevealed(),
  ])
  pattern1.reveal = [{ x: 3, y: 2 }]
  pattern1.flag = []
  patterns.push(pattern1)
  patterns.push(...createPatternVariants(pattern1))

  const pattern2 = new Pattern(3, 3, [
    blankWallOrNumber(),
    blankWallOrNumber(),
    blankWallOrNumber(),
    constant(1),
    constant(2),
    blankWallOrNumber(),
    unrevealed(),
    unrevealed(),
    unrevealed(),
  ])
  pattern2.reveal = []
  pattern2.flag = [{ x: 2, y: 2 }]
  patterns.push(pattern2)
  patterns.push(...createPatternVariants(pattern2))

  function createPatternVariants(pattern) {
    const pattern90 = pattern.rotate()
    const pattern180 = pattern90.rotate()
    const pattern270 = pattern180.rotate()
    const patternMH = pattern.mirrorHorizontally()
    const patternMH90 = patternMH.rotate()
    const patternMH180 = patternMH90.rotate()
    const patternMH270 = patternMH180.rotate()
    return [
      pattern90,
      pattern180,
      pattern270,
      patternMH,
      patternMH90,
      patternMH180,
      patternMH270,
    ]
  }

  function getNumberOfNeighbouringMines(neighbours) {
    return neighbours.filter(isMine).length
  }

  // In this version of the game when flagging wrongly it will correct itself immediately.
  // Therefore no wrong flags are possible.
  // Therefore flagged fields can be treated as mines.
  function isMine({ x, y }) {
    const number = minesweeper.playGrid.get(x, y)
    return number === EXPLODED || number >= MIN_FLAG
  }

  function getUnrevealedNeighbours(neighbours) {
    return neighbours.filter(isUnrevealed)
  }

  function getNumberOfUnrevealedNeighbours(neighbours) {
    return getUnrevealedNeighbours(neighbours).length
  }

  function isUnrevealed({ x, y }) {
    const number = minesweeper.playGrid.get(x, y)
    return number === UNREVEALED
  }

  function isCompletelyUnrevealed(width, height) {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const number = minesweeper.playGrid.get(x, y)
        if (!(isUnrevealed({ x, y }) || number === WALL)) {
          return false
        }
      }
    }
    return true
  }

  function getFirstUnrevealedCell(width, height) {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const position = { x, y }
        if (
          isUnrevealed(position) &&
          (!options.blacklist || !isOnBlacklist(position)) &&
          (!options.whitelist || isOnWhitelist(position))
        ) {
          return position
        }
      }
    }
    return null
  }

  function getFirstUnrevealedCellFromCenter(width, height) {
    for (let y = height / 2 - 1; y < height; y++) {
      for (let x = width / 2 - 1; x < width; x++) {
        const position = { x, y }
        if (
          isUnrevealed(position) &&
          (!options.blacklist || !isOnBlacklist(position)) &&
          (!options.whitelist || isOnWhitelist(position))
        ) {
          return position
        }
      }
    }
    return null
  }

  function solveIteration() {
    if (shouldStop) {
      isRunning = false
      isIdle = false
      return
    }

    if (isIdle) {
      return
    }

    let hasDoneSomething = false

    const width = minesweeper.playGrid.width
    const height = minesweeper.playGrid.height

    if (isCompletelyUnrevealed(width, height)) {
      const position = getFirstUnrevealedCellFromCenter(width, height)
      if (position) {
        reveal(position, "reveal first")
        hasDoneSomething = true
        nextSolveIteration()
        return
      }
    }

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        for (const pattern of patterns) {
          if (matchesPattern(pattern, { x, y })) {
            if (options.flag) {
              for (const { x: dx, y: dy } of pattern.flag) {
                const position = { x: x + dx, y: y + dy }
                if (
                  (!options.blacklist || !isOnBlacklist(position)) &&
                  (!options.whitelist || isOnWhitelist(position))
                ) {
                  flag(position, "flag by pattern")
                  hasDoneSomething = true
                }
              }
            }
          }
        }
      }
    }

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (solveFlag({ x, y })) {
          hasDoneSomething = true
        }
      }
    }

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        for (const pattern of patterns) {
          if (matchesPattern(pattern, { x, y })) {
            if (options.reveal) {
              for (const { x: dx, y: dy } of pattern.reveal) {
                const position = { x: x + dx, y: y + dy }
                if (
                  (!options.blacklist || !isOnBlacklist(position)) &&
                  (!options.whitelist || isOnWhitelist(position))
                ) {
                  reveal(position, "reveal by pattern")
                  hasDoneSomething = true
                }
              }
            }
          }
        }
      }
    }

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (solveReveal({ x, y })) {
          hasDoneSomething = true
        }
      }
    }

    /*
    if (!hasDoneSomething) {
        // Choose a position that helps to advance
        const mineProbabilities = calculateMineProbabilities()
        const {position, value} = getLowestMineProbabilityPosition(mineProbabilities)
        // if (!position) {
        //    position = getFirstUnrevealedCell(width, height)
        // }
        if (position) {
            console.log('reveal cell with lowest mine probability', value)
            reveal(position, 'reveal cell with lowest mine probability')
            hasDoneSomething = true
        }
    }
    */

    if (hasDoneSomething) {
      nextSolveIteration()
    } else {
      isIdle = true
    }
  }

  function calculateMineProbabilities() {
    const width = minesweeper.playGrid.width
    const height = minesweeper.playGrid.height
    const mineProbabilities = new Grid(width, height)
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const number = minesweeper.playGrid.get(x, y)
        if (number >= MIN_NUMBER && number <= MAX_NUMBER) {
          const neighbours = minesweeper.playGrid.getNeighbors(x, y)
          const numberOfNeighbouringMines =
            getNumberOfNeighbouringMines(neighbours)
          const unrevealedNeighbours = getUnrevealedNeighbours(neighbours)
          const numberOfUnrevealedNeighbours =
            getNumberOfUnrevealedNeighbours(neighbours)
          if (numberOfUnrevealedNeighbours > 0) {
            const mineProbability =
              (number - numberOfNeighbouringMines) /
              numberOfUnrevealedNeighbours
            for (const neighbour of unrevealedNeighbours) {
              if (
                (!options.blacklist || !isOnBlacklist(neighbour)) &&
                (!options.whitelist || isOnWhitelist(neighbour))
              ) {
                const previousMineProbability = mineProbabilities.get(neighbour)
                if (
                  typeof previousMineProbability === "undefined" ||
                  previousMineProbability === null ||
                  mineProbability < previousMineProbability
                ) {
                  mineProbabilities.set(neighbour, mineProbability)
                }
              }
            }
          }
        }
      }
    }
    return mineProbabilities
  }

  function getLowestMineProbabilityPosition(mineProbabilities) {
    const { position, value } = mineProbabilities.minimum()
    return { position, value }
  }

  function solveFlag(cellToSolve) {
    // let numSolvedConnected = 0
    let hasDoneSomething = false
    let cellsToSolveNext = [cellToSolve]
    do {
      const cellsToSolve = cellsToSolveNext
      cellsToSolveNext = []
      for (const { x, y } of cellsToSolve) {
        const number = minesweeper.playGrid.get(x, y)
        if (number >= MIN_NUMBER && number <= MAX_NUMBER) {
          const neighbours = minesweeper.playGrid.getNeighbors(x, y)
          const numberOfNeighbouringMines =
            getNumberOfNeighbouringMines(neighbours)
          const unrevealedNeighbours = getUnrevealedNeighbours(neighbours)
          const numberOfUnrevealedNeighbours =
            getNumberOfUnrevealedNeighbours(neighbours)
          if (numberOfUnrevealedNeighbours > 0) {
            const mineProbability =
              (number - numberOfNeighbouringMines) /
              numberOfUnrevealedNeighbours
            if (options.flag) {
              if (
                number - numberOfNeighbouringMines ===
                  numberOfUnrevealedNeighbours ||
                mineProbability === 1
              ) {
                for (const neighbour of unrevealedNeighbours) {
                  if (
                    (!options.blacklist || !isOnBlacklist(neighbour)) &&
                    (!options.whitelist || isOnWhitelist(neighbour))
                  ) {
                    flag(neighbour, "flag")
                    // cellsToSolveNext.push(neighbour)
                    // numSolvedConnected++
                    hasDoneSomething = true
                    // nextSolveIteration()
                    // return
                  }
                }
              }
            }
          }
        }
      }
    } while (cellsToSolveNext.length > 0)

    // if (numSolvedConnected > 0) {
    //     console.log('numSolvedConnected', numSolvedConnected)
    // }

    return hasDoneSomething
  }

  function solveReveal(cellToSolve) {
    // let numSolvedConnected = 0
    let hasDoneSomething = false
    let cellsToSolveNext = [cellToSolve]
    do {
      const cellsToSolve = cellsToSolveNext
      cellsToSolveNext = []
      for (const { x, y } of cellsToSolve) {
        const number = minesweeper.playGrid.get(x, y)
        if (number >= MIN_NUMBER && number <= MAX_NUMBER) {
          const neighbours = minesweeper.playGrid.getNeighbors(x, y)
          const numberOfNeighbouringMines =
            getNumberOfNeighbouringMines(neighbours)
          const unrevealedNeighbours = getUnrevealedNeighbours(neighbours)
          const numberOfUnrevealedNeighbours =
            getNumberOfUnrevealedNeighbours(neighbours)
          if (numberOfUnrevealedNeighbours > 0) {
            const mineProbability =
              (number - numberOfNeighbouringMines) /
              numberOfUnrevealedNeighbours
            if (options.reveal) {
              if (mineProbability === 0) {
                for (const neighbour of unrevealedNeighbours) {
                  if (
                    (!options.blacklist || !isOnBlacklist(neighbour)) &&
                    (!options.whitelist || isOnWhitelist(neighbour))
                  ) {
                    reveal(neighbour, "reveal")
                    // cellsToSolveNext.push(neighbour)
                    // numSolvedConnected++
                    hasDoneSomething = true
                    // nextSolveIteration()
                    // return
                  }
                }
              }
            }
          }
        }
      }
    } while (cellsToSolveNext.length > 0)

    // if (numSolvedConnected > 0) {
    //     console.log('numSolvedConnected', numSolvedConnected)
    // }

    return hasDoneSomething
  }

  function flag({ x, y }, logMessage) {
    click({ x, y }, minesweeper.placeFlag.bind(minesweeper), logMessage)
  }

  function reveal({ x, y }, logMessage) {
    click({ x, y }, minesweeper.revealCell.bind(minesweeper), logMessage)
  }

  function click({ x, y }, action, logMessage) {
    // console.log(logMessage, {x, y})
    clicked.set({ x, y }, Date.now())
    moveView({ x, y })
    action(x, y)
  }

  function moveView({ x, y }) {
    const minesweeperUI = window.appController.game.state.states.MinesweeperUI
    const px = Math.floor(
      Math.max(0, x * minesweeperUI.TILE_SIZE - minesweeperUI.game.width / 2),
    )
    const py = Math.floor(
      Math.max(0, y * minesweeperUI.TILE_SIZE - minesweeperUI.game.height / 2),
    )
    minesweeperUI.moveCamera(px, py)
    minesweeper.moveView(x, y, minesweeper.user)
  }

  function nextSolveIteration() {
    // setTimeout(() => requestAnimationFrame(solveIteration), 1000)
    requestAnimationFrame(solveIteration)
  }

  function matchesPattern(pattern, { x, y }) {
    return pattern.every(fieldMatches.bind(null, { x, y }, pattern))
  }

  function fieldMatches({ x, y }, pattern, fieldMatcher, { x: dx, y: dy }) {
    const gridPosition = { x: x + dx, y: y + dy }
    return fieldMatcher(gridPosition)
  }

  function series(minInclusive, maxInclusive) {
    const numbers = []
    for (let number = minInclusive; number <= maxInclusive; number++) {
      numbers.push(number)
    }
    return numbers
  }

  return {
    start(customOptions = {}) {
      const wasRunning = isRunning
      options = { ...defaultOptions, ...customOptions }
      shouldStop = false
      isIdle = false
      isRunning = true
      if (!wasRunning) {
        requestAnimationFrame(solveIteration)
      }
    },

    stop() {
      shouldStop = true
    },
  }
})()
