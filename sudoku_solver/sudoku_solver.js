import { concat } from '../packages/array/src/concat.js'
import { difference, union } from '../packages/set/built/index.js'

export const sudoku = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
]

const blockWidth = 3
const blockHeight = 3

export function getSudokuFromSudokuInput(sudokuInput) {
  const cells = sudokuInput.querySelectorAll('input')
  const sudoku = new Array()
  for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
    const row = new Array()
    sudoku.push(row)
    for (let columnIndex = 0; columnIndex < 9; columnIndex++) {
      const value = cells[rowIndex * 9 + columnIndex].value
      const number = value ? Number(value) : 0
      row.push(number)
    }
  }
  return sudoku
}

export function renderSudokuInputToHTML(sudoku) {
  const table = document.createElement('table')
  table.classList.add('sudoku')
  table.classList.add('sudoku-input')
  const tbody = document.createElement('tbody')
  table.appendChild(tbody)
  for (let rowIndex = 0; rowIndex < sudoku.length; rowIndex++) {
    const tr = document.createElement('tr')
    for (let columnIndex = 0; columnIndex < sudoku[rowIndex].length; columnIndex++) {
      const td = document.createElement('td')
      const input = document.createElement('input')
      input.maxLength = 1
      const value = sudoku[rowIndex][columnIndex]
      if (value !== 0) {
        input.value = value
      }
      td.appendChild(input)
      tr.appendChild(td)
    }
    tbody.appendChild(tr)
  }
  return table
}

export function renderSudokuToHTML(sudoku) {
  const table = document.createElement('table')
  table.classList.add('sudoku')
  const tbody = document.createElement('tbody')
  table.appendChild(tbody)
  for (let rowIndex = 0; rowIndex < sudoku.length; rowIndex++) {
    const tr = document.createElement('tr')
    for (let columnIndex = 0; columnIndex < sudoku[rowIndex].length; columnIndex++) {
      const td = document.createElement('td')
      const value = sudoku[rowIndex][columnIndex]
      if (value === 0) {
        td.innerHTML = '&nbsp;'
      } else {
        td.innerText = value
      }
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
    for (let columnIndex = 0; columnIndex < possibleNumbers[rowIndex].length; columnIndex++) {
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
      td.innerHTML = possibleNumbersA && possibleNumbersA.includes(number) ? number : '&nbsp;'
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
        possibleNumbers[rowIndex][columnIndex] = [
          ...difference(
            new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]),
            union(
              union(new Set(getRow(sudoku, rowIndex)), new Set(getColumn(sudoku, columnIndex))),
              new Set(concat(...getBlock(sudoku, rowIndex, columnIndex)))
            )
          ),
        ]
      }
    }
  }

  for (let rowIndex = 0; rowIndex < possibleNumbers.length; rowIndex++) {
    for (let columnIndex1 = 0; columnIndex1 < possibleNumbers[rowIndex].length; columnIndex1++) {
      for (let columnIndex2 = columnIndex1 + 1; columnIndex2 < possibleNumbers[rowIndex].length; columnIndex2++) {
        const cell1 = possibleNumbers[rowIndex][columnIndex1]
        const cell2 = possibleNumbers[rowIndex][columnIndex2]
        if (cell1 && cell2 && cell1.length === 2 && cell2.length === 2 && union(cell1, cell2).size === 2) {
          for (let columnIndex3 = 0; columnIndex3 < possibleNumbers[rowIndex].length; columnIndex3++) {
            const cell3 = possibleNumbers[rowIndex][columnIndex3]
            if (cell3 && cell3 !== cell1 && cell3 !== cell2) {
              possibleNumbers[rowIndex][columnIndex3] = Array.from(difference(cell3, new Set(cell1)))
            }
          }

          if (isInSameBlock({ rowIndex, columnIndex: columnIndex1 }, { rowIndex, columnIndex: columnIndex2 })) {
            const blockStartRowIndex = getBlockStartRowIndex(rowIndex)
            const blockStartColumnIndex = getBlockStartColumnIndex(columnIndex1)
            for (let blockRowIndex = 0; blockRowIndex < blockHeight; blockRowIndex++) {
              for (let blockColumnIndex = 0; blockColumnIndex < blockWidth; blockColumnIndex++) {
                const rowIndex4 = blockStartRowIndex + blockRowIndex
                const columnIndex4 = blockStartColumnIndex + blockColumnIndex
                if (
                  possibleNumbers[rowIndex4][columnIndex4] &&
                  !(
                    (rowIndex4 === rowIndex && columnIndex4 === columnIndex1) ||
                    (rowIndex4 === rowIndex && columnIndex4 === columnIndex2)
                  )
                ) {
                  possibleNumbers[rowIndex4][columnIndex4] = Array.from(
                    difference(possibleNumbers[rowIndex4][columnIndex4], new Set(cell1))
                  )
                }
              }
            }
          }
        }
      }
    }
  }

  for (let columnIndex = 0; columnIndex < possibleNumbers[0].length; columnIndex++) {
    for (let rowIndex1 = 0; rowIndex1 < possibleNumbers.length; rowIndex1++) {
      for (let rowIndex2 = rowIndex1 + 1; rowIndex2 < possibleNumbers.length; rowIndex2++) {
        const cell1 = possibleNumbers[rowIndex1][columnIndex]
        const cell2 = possibleNumbers[rowIndex2][columnIndex]
        if (cell1 && cell2 && cell1.length === 2 && cell2.length === 2 && union(cell1, cell2).size === 2) {
          for (let rowIndex3 = 0; rowIndex3 < possibleNumbers.length; rowIndex3++) {
            const cell3 = possibleNumbers[rowIndex3][columnIndex]
            if (cell3 && cell3 !== cell1 && cell3 !== cell2) {
              possibleNumbers[rowIndex3][columnIndex] = Array.from(difference(cell3, new Set(cell1)))
            }
          }
        }
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
    for (let columnIndex = 0; columnIndex < possibleNumbers[rowIndex].length; columnIndex++) {
      if (possibleNumbers[rowIndex][columnIndex]) {
        const possibleNumbersA = possibleNumbers[rowIndex][columnIndex]

        let solution
        if (possibleNumbersA.length === 1) {
          solution = possibleNumbersA[0]
        } else {
          const row = new Set(concat(...getRowWithout(possibleNumbers, rowIndex, columnIndex)))
          const column = new Set(concat(...getColumnWithout(possibleNumbers, rowIndex, columnIndex)))
          const block = new Set(concat(...concat(...getBlockWithout(possibleNumbers, rowIndex, columnIndex))))
          solution = possibleNumbersA.find(possibleSolution => {
            return !row.has(possibleSolution) || !column.has(possibleSolution) || !block.has(possibleSolution)
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
  return possibleNumbers
    .map(row => {
      const aas = row.map(renderPossibleNumbersA)
      const aa1 = aas
        .map(aasa => aasa.slice(0, 3))
        .map(aasaa => aasaa.join(' '))
        .join(' | ')
      const aa2 = aas
        .map(aasa => aasa.slice(3, 6))
        .map(aasaa => aasaa.join(' '))
        .join(' | ')
      const aa3 = aas
        .map(aasa => aasa.slice(6, 9))
        .map(aasaa => aasaa.join(' '))
        .join(' | ')
      return aa1 + '\n' + aa2 + '\n' + aa3
    })
    .join('\n' + '-----'.repeat(9) + '---'.repeat(9 - 1) + '\n')
}

function renderPossibleNumbersA(possibleNumbersA) {
  const parts = new Array(9)
  for (let number = 1; number <= 9; number++) {
    parts[number - 1] = possibleNumbersA && possibleNumbersA.includes(number) ? String(number) : ' '
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
  rowIndex = getBlockStartRowIndex(rowIndex)
  columnIndex = getBlockStartColumnIndex(columnIndex)
  const block = new Array(blockHeight)
  for (let blockRowIndex = 0; blockRowIndex < blockHeight; blockRowIndex++) {
    block[blockRowIndex] = new Array(blockWidth)
    for (let blockColumnIndex = 0; blockColumnIndex < blockWidth; blockColumnIndex++) {
      block[blockRowIndex][blockColumnIndex] = sudoku[rowIndex + blockRowIndex][columnIndex + blockColumnIndex]
    }
  }
  return block
}

function getBlockStartRowIndex(rowIndex) {
  return Math.floor(rowIndex / blockHeight) * blockHeight
}

function getBlockStartColumnIndex(columnIndex) {
  return Math.floor(columnIndex / blockWidth) * blockWidth
}

function isInSameBlock(cellA, cellB) {
  const { rowIndex: rowIndex1, columnIndex: columnIndex1 } = cellA
  const { rowIndex: rowIndex2, columnIndex: columnIndex2 } = cellB
  return (
    getBlockStartRowIndex(rowIndex1) === getBlockStartRowIndex(rowIndex2) &&
    getBlockStartColumnIndex(columnIndex1) === getBlockStartColumnIndex(columnIndex2)
  )
}
