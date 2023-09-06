interface CellPosition {
  row: number
  column: number
}

export class Grid2D<T> {
  width: number
  height: number
  values: any[] = []

  constructor(width: number, height: number, values?: T[]) {
    this.width = width
    this.height = height
    this._initializeValues(width, height, values)
  }

  _initializeValues(width: number, height: number, values?: T[]) {
    const length = width * height
    if (values) {
      if (values.length === length) {
        this.values = values
      } else {
        throw new Error(
          `values length ${values.length} does't match ` +
            `expected length of ${length}.`,
        )
      }
    } else {
      this.values = new Array(length)
    }
  }

  get({ row, column }: CellPosition) {
    return this.values[this.calculateIndex({ row, column })]
  }

  set({ row, column }: CellPosition, value: T): void {
    this.values[this.calculateIndex({ row, column })] = value
  }

  calculateIndex({ row, column }: CellPosition) {
    return (row - 1) * this.width + (column - 1)
  }

  indexToPosition(index: number): CellPosition {
    return {
      row: 1 + Math.floor(index / this.width),
      column: 1 + (index % this.width),
    }
  }

  entries(): [CellPosition, T][] {
    return Array.from(this.values.entries()).map(([index, value]) => [
      this.indexToPosition(index),
      value,
    ])
  }

  forEach(f: (value: T, index: number, array: T[]) => void): void {
    this.values.forEach(f)
  }

  resize(width: number, height: number): void {
    if (width !== this.width || height !== this.height) {
      const values = new Array(width * height)
      for (let rowIndex = 0; rowIndex < height; rowIndex++) {
        const index = this.calculateIndex({ row: rowIndex + 1, column: 1 })
        const row = this.values.slice(index, index + width)
        values.splice(rowIndex * width, row.length, ...row)
      }
      this.width = width
      this.height = height
      this.values = values
    }
  }
}
