import { multiply } from './packages/arithmetic/multiply.js';

export class Grid3D {
  constructor(dimensions) {
    this.dimensions = dimensions
    this.values = new Array(multiply(dimensions))
  }

  _calculateIndex(position) {
    return position.reduce(
      (result, value, index) => result + value * this.dimensions[index]
    )
  }

  get(position) {
    return this.values[this._calculateIndex(position)]
  }

  set(position, value) {
    this.values[this._calculateIndex(position)] = value
  }
}
