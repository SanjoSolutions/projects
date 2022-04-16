import {
  bruteForce,
  fillSolutions,
  getPossibleNumbers,
  getSudokuFromSudokuInput,
  renderPossibleNumbersToHTML,
  renderSudokuInputToHTML,
  renderSudokuToHTML,
  solve,
  sudoku as initialSudoku,
} from './lib.js'
import { union } from '@sanjo/set'

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
  const firstInput = sudokuInput.querySelector('input')
  firstInput.autofocus = true
  column1.appendChild(sudokuInput)
  firstInput.select()

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

  const digitKeys = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9'])
  const keysForWhichToDoTheDefaultOfKeyDown = union(digitKeys, new Set(['Backspace', 'Tab', 'Delete']))
  const keyForWhichToGoToTheNextInput = union(digitKeys, new Set(['Enter']))

  document.addEventListener('keydown', function (event) {
    const { target } = event
    if (target.tagName === 'INPUT' && !keysForWhichToDoTheDefaultOfKeyDown.has(event.key)) {
      event.preventDefault()
    }
  })

  document.addEventListener('keyup', function (event) {
    const { target } = event
    if (target.tagName === 'INPUT' && keyForWhichToGoToTheNextInput.has(event.key)) {
      const inputValue = parseInt(target.value, 10)
      if ((inputValue >= 1 && inputValue <= 9) || event.key === 'Enter') {
        const nextInput = findNextInput(target)
        if (nextInput) {
          nextInput.focus()
          nextInput.select()
        }
      }

      localStorage.setItem('sudoku', JSON.stringify(getSudokuFromSudokuInput(sudokuInput)))
    }
  })

  function findNextInput(input) {
    const inputs = Array.from(sudokuInput.querySelectorAll('input'))
    const inputIndex = inputs.indexOf(input)
    if (inputIndex !== -1) {
      const nextInputIndex = inputIndex + 1
      if (nextInputIndex < inputs.length) {
        const nextInput = inputs[nextInputIndex]
        return nextInput
      }
    }
    return null
  }
}
