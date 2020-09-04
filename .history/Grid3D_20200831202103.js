export class Grid3D {
  constructor(dimensions) {
    this.dimensions = dimensions
    this.values = new Array(multiply(dimensions))
  }
}
