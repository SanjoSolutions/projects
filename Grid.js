import { multiply } from "./packages/arithmetic/multiply.js"

export class Grid {
  #values

  constructor(dimensions, values = undefined) {
    this.dimensions = dimensions
    const length = multiply(dimensions)
    this.#values = values ? Array.from(values) : new Array(length)
  }

  _calculateIndex(position) {
    return position.reduce(
      (result, value, index) =>
        result +
        value * (index === 0 ? 1 : multiply(this.dimensions.slice(0, index)))
    )
  }

  get(position) {
    return this.#values[this._calculateIndex(position)]
  }

  set(position, value) {
    this.#values[this._calculateIndex(position)] = value
  }

  entries() {
    return this._entriesRecursion([])
  }

  _entriesRecursion(position) {
    if (position.length === this.dimensions.length) {
      return [[position, this.get(position)]]
    } else {
      const dimensionSize = this.dimensions[
        this.dimensions.length - 1 - position.length
      ]
      const entries = new Array(dimensionSize)
      for (let coordinate = 0; coordinate < dimensionSize; coordinate++) {
        entries[coordinate] = this._entriesRecursion([coordinate, ...position])
      }
      return entries.flat()
    }
  }

  values() {
    return this.#values
  }
}
