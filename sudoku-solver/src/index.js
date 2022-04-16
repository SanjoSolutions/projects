import {
  sudoku as initialSudoku,
  renderSudokuToHTML,
  getPossibleNumbers,
  renderPossibleNumbersToHTML,
  solve,
  fillSolutions,
  getSudokuFromSudokuInput,
  renderSudokuInputToHTML,
  bruteForce,
} from './lib.js'

let sudoku
const sudokuSavedSerialized = localStorage.getItem('sudoku')
if (sudokuSavedSerialized) {
  sudoku = JSON.parse(sudokuSavedSerialized)
} else {
  sudoku = [...initialSudoku]
}
let possibleNumbers = [
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
let solutions = [
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

document.addEventListener('DOMContentLoaded', () => {
  render()
})

function render() {
  document.body.innerHTML = ''

  const row = document.createElement('div')
  row.classList.add('row')

  const column1 = document.createElement('div')
  column1.classList.add('column')

  const column2 = document.createElement('div')
  column2.classList.add('column')

  const column3 = document.createElement('div')
  column3.classList.add('column')

  row.append(column1, column2, column3)

  document.body.appendChild(row)

  const sudokuInput = renderSudokuInputToHTML(sudoku)
  sudokuInput.querySelector('input').autofocus = true
  column1.appendChild(sudokuInput)

  column1.appendChild(document.createElement('br'))

  const button = document.createElement('button')
  button.innerText = 'Next'
  button.style.marginRight = '0.5rem'
  button.addEventListener('click', () => {
    sudoku = getSudokuFromSudokuInput(sudokuInput)
    possibleNumbers = getPossibleNumbers(sudoku)
    solutions = solve(possibleNumbers)
    sudoku = fillSolutions(sudoku, solutions)
    render()
  })
  column1.appendChild(button)

  const bruteForceButton = document.createElement('button')
  bruteForceButton.innerText = 'Brute force'
  bruteForceButton.style.marginRight = '0.5rem'
  bruteForceButton.addEventListener('click', () => {
    const solution = bruteForce(sudoku)
    if (solution) {
      solutions = solution.map((row, rowIndex) =>
        row.map((value, columnIndex) => (sudoku[rowIndex][columnIndex] ? null : value))
      )
      sudoku = solution
    }
    render()
  })
  column1.appendChild(bruteForceButton)

  const resetButton = document.createElement('button')
  resetButton.innerText = 'Reset'
  resetButton.addEventListener('click', () => {
    sudoku = [...initialSudoku]
    render()
  })
  column1.appendChild(resetButton)

  column2.appendChild(renderSudokuToHTML(solutions))

  column3.appendChild(renderPossibleNumbersToHTML(possibleNumbers))

  document.addEventListener('keyup', function (event) {
    if (event.target.tagName === 'INPUT') {
      localStorage.setItem('sudoku', JSON.stringify(getSudokuFromSudokuInput(sudokuInput)))
    }
  })
}
