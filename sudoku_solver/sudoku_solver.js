import { concat } from '../packages/array/src/array.js'
import { difference, union } from '../set.js'

export const sudoku = [
  [9, 8, 4, 6, 0, 0, 5, 3, 1],
  [0, 0, 7, 0, 0, 0, 0, 4, 0],
  [6, 0, 0, 5, 4, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 8, 3, 7, 4],
  [0, 0, 0, 0, 6, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 9, 6, 2],
  [0, 3, 2, 0, 0, 7, 4, 0, 0],
  [0, 4, 0, 3, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 3],
]

export function renderSudokuToHTML(sudoku) {
  const table = document.createElement('table')
  table.classList.add('sudoku')
  const tbody = document.createElement('tbody')
  table.appendChild(tbody)
  for (let rowIndex = 0; rowIndex < sudoku.length; rowIndex++) {
    const tr = document.createElement('tr')
    for (let columnIndex = 0; columnIndex < sudoku[rowIndex].length; columnIndex++) {
      const td = document.createElement('td')
      td.innerText = sudoku[rowIndex][columnIndex]
      tr.appendChild(td)
    }
    tbody.appendChild(tr)
  }
  return table
}

export function renderPossibleNumbersToHTML(possibleNumbers) {
  const table = document.createElement('table')
  table.classList.add('possible-numbers')
  const tbody = document.createElement('tbody')
  table.appendChild(tbody)
  for (let rowIndex = 0; rowIndex < possibleNumbers.length; rowIndex++) {
    const tr = document.createElement('tr')
    for (
      let columnIndex = 0;
      columnIndex < possibleNumbers[rowIndex].length;
      columnIndex++
    ) {
      const td = document.createElement('td')
      td.appendChild(renderPossibleNumbersAToHTML(possibleNumbers[rowIndex][columnIndex]))
      tr.appendChild(td)
    }
    tbody.appendChild(tr)
  }
  return table
}

function renderPossibleNumbersAToHTML(possibleNumbersA) {
  const table = document.createElement('table')
  const tbody = document.createElement('tbody')
  table.appendChild(tbody)
  for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
    const tr = document.createElement('tr')
    for (let columnIndex = 0; columnIndex < 3; columnIndex++) {
      const td = document.createElement('td')
      const number = rowIndex * 3 + columnIndex + 1
      td.innerHTML =
        possibleNumbersA && possibleNumbersA.includes(number) ? number : '&nbsp;'
      tr.appendChild(td)
    }
    tbody.appendChild(tr)
  }
  return table
}

// console.log(renderPossibleNumbers(possibleNumbers(sudoku)))
// console.log(solve(possibleNumbers(sudoku)))

export function possibleNumbers(sudoku) {
  const possibleNumbers = [
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
  ]

  for (let rowIndex = 0; rowIndex < sudoku.length; rowIndex++) {
    for (let columnIndex = 0; columnIndex < sudoku[rowIndex].length; columnIndex++) {
      if (!sudoku[rowIndex][columnIndex]) {
        possibleNumbers[rowIndex][columnIndex] =
          [
            ...difference(
              new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]),
              union(
                union(
                  new Set(getRow(sudoku, rowIndex)),
                  new Set(getColumn(sudoku, columnIndex)),
                ),
                new Set(concat(...getBlock(sudoku, rowIndex, columnIndex))),
              ),
            ),
          ]
      }
    }
  }

  return possibleNumbers
}

export function solve(possibleNumbers) {
  const solutions = [
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
  ]

  for (let rowIndex = 0; rowIndex < possibleNumbers.length; rowIndex++) {
    for (
      let columnIndex = 0;
      columnIndex < possibleNumbers[rowIndex].length;
      columnIndex++
    ) {
      if (possibleNumbers[rowIndex][columnIndex]) {
        const possibleNumbersA = possibleNumbers[rowIndex][columnIndex]

        let solution
        if (possibleNumbersA.length === 1) {
          solution = possibleNumbersA[0]
        } else {
          const row = new Set(concat(...getRowWithout(
            possibleNumbers,
            rowIndex,
            columnIndex,
          )))
          const column = new Set(concat(...getColumnWithout(
            possibleNumbers,
            rowIndex,
            columnIndex,
          )))
          const block = new Set(concat(...concat(...getBlockWithout(
            possibleNumbers,
            rowIndex,
            columnIndex,
          ))))
          solution = possibleNumbersA.find(possibleSolution => {
            return (
              !row.has(possibleSolution) ||
              !column.has(possibleSolution) ||
              !block.has(possibleSolution)
            )
          })
        }

        if (solution) {
          solutions[rowIndex][columnIndex] = solution
        }
      }
    }
  }

  return solutions
}

export function fillSolutions(sudoku, solutions) {
  sudoku = [...sudoku]
  for (let rowIndex = 0; rowIndex < sudoku.length; rowIndex++) {
    for (let columnIndex = 0; columnIndex < sudoku[rowIndex].length; columnIndex++) {
      if (solutions[rowIndex][columnIndex]) {
        sudoku[rowIndex][columnIndex] = solutions[rowIndex][columnIndex]
      }
    }
  }
  return sudoku
}

function renderPossibleNumbers(possibleNumbers) {
  return possibleNumbers.map(
    row => {
      const aas = row.map(renderPossibleNumbersA)
      const aa1 = aas.map(aasa => aasa.slice(0, 3))
        .map(aasaa => aasaa.join(' '))
        .join(' | ')
      const aa2 = aas.map(aasa => aasa.slice(3, 6))
        .map(aasaa => aasaa.join(' '))
        .join(' | ')
      const aa3 = aas.map(aasa => aasa.slice(6, 9))
        .map(aasaa => aasaa.join(' '))
        .join(' | ')
      return aa1 + '\n' + aa2 + '\n' + aa3
    },
  ).join('\n' + '-----'.repeat(9) + '---'.repeat(9 - 1) + '\n')
}

function renderPossibleNumbersA(possibleNumbersA) {
  const parts = new Array(9)
  for (let number = 1; number <= 9; number++) {
    parts[number - 1] =
      possibleNumbersA && possibleNumbersA.includes(number) ? String(number) : ' '
  }
  return parts
}

function getRowWithout(sudoku, rowIndex, columnIndex) {
  const row = [...getRow(sudoku, rowIndex)]
  row.splice(columnIndex, 1)
  return row
}

function getColumnWithout(sudoku, rowIndex, columnIndex) {
  const column = [...getColumn(sudoku, columnIndex)]
  column.splice(rowIndex, 1)
  return column
}

function getBlockWithout(sudoku, rowIndex, columnIndex) {
  const block = getBlock(sudoku, rowIndex, columnIndex)
  const blockWidth = 3
  const blockHeight = 3
  block[rowIndex % blockHeight] = [...block[rowIndex % blockHeight]]
  block[rowIndex % blockHeight].splice(columnIndex % blockWidth, 1, null)
  return block
}

function getRow(sudoku, rowIndex) {
  return sudoku[rowIndex]
}

function getColumn(sudoku, columnIndex) {
  const numberOfRows = sudoku.length
  const column = new Array(numberOfRows)
  for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
    column[rowIndex] = sudoku[rowIndex][columnIndex]
  }
  return column
}

function getBlock(sudoku, rowIndex, columnIndex) {
  const blockHeight = 3
  const blockWidth = 3
  rowIndex = Math.floor(rowIndex / blockHeight) * blockHeight
  columnIndex = Math.floor(columnIndex / blockWidth) * blockWidth
  const block = new Array(blockHeight * blockWidth)
  for (let blockRowIndex = 0; blockRowIndex < blockHeight; blockRowIndex++) {
    block[blockRowIndex] = new Array(blockWidth)
    for (let blockColumnIndex = 0; blockColumnIndex < blockWidth; blockColumnIndex++) {
      block[blockRowIndex][blockColumnIndex] =
        sudoku[rowIndex + blockRowIndex][columnIndex + blockColumnIndex]
    }
  }
  return block
}
