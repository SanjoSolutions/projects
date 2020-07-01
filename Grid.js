export class Grid {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.values = new Array(width * height)
    }

    get({row, column}) {
        return this.values[this.calculateIndex({row, column})]
    }

    set({row, column}, value) {
        this.values[this.calculateIndex({row, column})] = value
    }

    calculateIndex({row, column}) {
        return (row - 1) * this.width + (column - 1)
    }

    indexToPosition(index) {
        return {
            row: 1 + Math.floor(index / this.width),
            column: 1 + (index % this.width)
        }
    }

    entries() {
        return Array.from(this.values.entries())
            .map(([index, value]) => ([this.indexToPosition(index), value]))
    }

    resize(width, height) {
        if (width !== this.width || height !== this.height) {
            const values = new Array(width * height)
            for (let rowIndex = 0; rowIndex < height; rowIndex++) {
                const index = this.calculateIndex({row: rowIndex + 1, column: 1})
                const row = this.values.slice(index, index + width)
                values.splice(
                    rowIndex * width,
                    row.length,
                    ...row
                )
            }
            this.width = width
            this.height = height
            this.values = values
        }
    }
}
