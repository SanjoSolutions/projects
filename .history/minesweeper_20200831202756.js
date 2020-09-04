/*
import { Grid2D as Grid } from './Grid2D.js';
import { randomInteger } from './randomInteger.js';

    i
    i
    i
    i
    i
    i
    i
    i
    i
    i
    i
    i
    i
    i
    ii
    ii
    i
    i
    i
    i
    i
    i


    iii

    fdsiofhsaödgj
    */

// canvas

// 3d effect of cells (see minesweeper.io)
// => 1px solid border for each cell (not just a line that separates cells)

export class Minesweeper {
  static MINE = -1

  constructor(width, height) {
    this.numberOfMines = Math.floor(0.2 * (width * height))
    this.grid = new Grid(width, height)
    this.initializeGrid()
  }

  initializeGrid() {
    this.placeMines()
    this.calculateNumbers()
  }

  placeMines() {
    const freePositions = this.grid.entries().map(([position]) => position)
    for (
      let mineIndex = 0;
      mineIndex < this.numberOfMines && freePositions.length >= 1;
      mineIndex++
    ) {
      const positionIndex = randomInteger(0, freePositions.length - 1)
      const position = freePositions.splice(positionIndex, 1)[0]
      this.grid.set(position, Minesweeper.MINE)
    }
  }

  calculateNumbers() {
    for (const [position, value] of this.grid.entries()) {
      this.grid.set(position, this.calculateNumber(position))
    }
  }

  calculateNumber(position) {
    const neighbours = this.getNeighbours(position)
    let number = 0
    for (const [position, value] of neighbours) {
      if (value === Minesweeper.MINE) {
        number += 1
      }
    }
    return number
  }

  getNeighbours(position) {
    const neighbours = []
    for (
      let row = Math.max(1, position.row - 1);
      row <= Math.min(position.row + 1, this.grid.width);
      row++
    ) {
      for (
        let column = Math.max(1, position.column - 1);
        column <= Math.min(position.column + 1, this.grid.height);
        column++
      ) {
        if (!(row === position.row && column === position.column)) {
          const position = { row, column }
          neighbours.push([position, this.grid.get(position)])
        }
      }
    }
    return neighbours
  }
}

class Cell {
  constructor(value, revealed = false) {
    this.value = value
    this.revealed = revealed
  }
}

function drawMinesweeper(canvas, context, minesweeper) {}
