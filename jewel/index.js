import { selectRandomUniform } from '../selectRandomUniform.js'

const CIRCLE_MARGIN = 4 // 0.25rem with 1rem = 16px
const SPACE_BETWEEN_CIRCLES = 2 * CIRCLE_MARGIN
const CIRCLE_LENGTH = 32 // 2rem with 1rem = 16px
const CIRCLE_WIDTH = CIRCLE_LENGTH
const CIRCLE_HEIGHT = CIRCLE_LENGTH
const CIRCLE_BORDER = 1 // px
const DISTANCE_THRESHOLD = 0.5 * (CIRCLE_LENGTH + SPACE_BETWEEN_CIRCLES) // px
const MINIMUM_AMOUNT_OF_CIRCLES_ON_SAME_LINE_FOR_REMOVAL = 3

export function main() {
  const rows = 20
  const columns = 20
  const colors = ['red', 'green', 'yellow', 'blue']
  const circleGrid = document.querySelector('.circle-grid')
  spawnCircles(circleGrid, { rows, columns, colors })

  const connectionLineCanvas = document.querySelector('.connection-line-canvas')
  connectionLineCanvas.width = circleGrid.clientWidth
  connectionLineCanvas.height = circleGrid.clientHeight
  const context = connectionLineCanvas.getContext('2d')

  let selectedCircles = new Set()
  let firstSelectedCircle = null
  let selectedColor = null
  let lastSelectedCircle = null
  let selectedCircleOffset = null
  let lastCircleThatTheSelectedCircleWasMovingTowards = null

  function isSelectingCircles() {
    return lastSelectedCircle !== null
  }

  circleGrid.addEventListener('pointerdown', function (event) {
    const target = event.target
    if (target.classList.contains('circle')) {
      event.preventDefault()
      const circle = target
      selectedCircles.add(circle)
      firstSelectedCircle = circle
      selectedColor = determineCircleColor(firstSelectedCircle)
      lastSelectedCircle = circle
      selectedCircleOffset = {
        x: 0,
        y: 0,
      }
      firstSelectedCircle.classList.add('circle--dragged')
      updateCircleOffsets()
    }
  })

  circleGrid.addEventListener('pointermove', function (event) {
    if (isSelectingCircles()) {
      const target = event.target
      if (target.classList.contains('circle')) {
        const circle = target
        const circleColor = determineCircleColor(circle)
        if (
          circleColor === selectedColor &&
          (!selectedCircles.has(circle) || (selectedCircles.size >= 3 && circle === firstSelectedCircle)) &&
          canBeConnected(circle, lastSelectedCircle)
        ) {
          drawConnectionLine(circle, lastSelectedCircle)
          selectedCircles.add(circle)
          lastSelectedCircle = circle
        }
      }
      selectedCircleOffset = {
        x: selectedCircleOffset.x + event.movementX,
        y: selectedCircleOffset.y + event.movementY,
      }
      updateCircleOffsets()
    }
  })

  window.addEventListener('pointerup', function () {
    if (isSelectingCircles()) {
      if (selectedCircles.size >= 2) {
        if (hasSquareBeenSelected(selectedCircles, columns)) {
          const circles = circleGrid.querySelectorAll('.circle')
          for (const circle of circles) {
            if (determineCircleColor(circle) === selectedColor) {
              removeCircle(circle)
            }
          }
        } else {
          selectedCircles.forEach(removeCircle)
        }
      }

      if (lastCircleThatTheSelectedCircleWasMovingTowards) {
        const { x: offsetX, y: offsetY } = determineNormalizedCircleOffset(selectedCircleOffset)
        const distanceMoved = Math.abs(offsetX + offsetY)
        if (distanceMoved > DISTANCE_THRESHOLD) {
          swapCircles(firstSelectedCircle, lastCircleThatTheSelectedCircleWasMovingTowards)

          for (const circle of new Set([firstSelectedCircle, lastCircleThatTheSelectedCircleWasMovingTowards])) {
            const color = determineCircleColor(circle)
            const startPosition = determinePosition(circle)
            let circlesToRemove = new Set()
            const horizontalOffsets = new Set([
              { row: 0, column: -1 },
              { row: 0, column: 1 },
            ])
            const verticalOffsets = new Set([
              { row: -1, column: 0 },
              { row: 1, column: 0 },
            ])
            const offsetSets = new Set([horizontalOffsets, verticalOffsets])
            for (const offsetSet of offsetSets) {
              let circlesWithSameColor = new Set()
              for (const offset of offsetSet) {
                circlesWithSameColor = union(
                  circlesWithSameColor,
                  determineCirclesWithSameColorInDirection(color, startPosition, offset)
                )
              }
              console.log(circlesWithSameColor.size)
              if (circlesWithSameColor.size >= MINIMUM_AMOUNT_OF_CIRCLES_ON_SAME_LINE_FOR_REMOVAL - 1) {
                circlesToRemove = union(circlesToRemove, circlesWithSameColor)
              }
            }

            for (const circle of circlesToRemove) {
              removeCircle(circle)
            }
          }
        }
      }

      firstSelectedCircle.classList.remove('circle--dragged')
      removeSelectedCircleOffset()
      removeLastCircleThatTheSelectedCircleWasMovingTowardsOffset()

      selectedCircles = new Set()
      firstSelectedCircle = null
      selectedColor = null
      lastSelectedCircle = null
      selectedCircleOffset = null
      lastCircleThatTheSelectedCircleWasMovingTowards = null
      context.clearRect(0, 0, connectionLineCanvas.width, connectionLineCanvas.height)
    }
  })

  function updateCircleOffsets() {
    updateSelectedCircleOffset()
    updateCircleOffsetThatTheSelectedCircleIsMovingTowards()
  }

  function updateSelectedCircleOffset() {
    const { x: translateX, y: translateY } = determineNormalizedCircleOffset(selectedCircleOffset)
    firstSelectedCircle.style.transform = `translate(${translateX}px, ${translateY}px)`
  }

  function determineNormalizedCircleOffset(offset) {
    const { x, y } = offset
    const absoluteX = Math.abs(x)
    const absoluteY = Math.abs(y)
    const normalizedX = absoluteX > absoluteY ? x : 0
    const normalizedY = absoluteY > absoluteX ? y : 0
    return {
      x: normalizedX,
      y: normalizedY,
    }
  }

  function updateCircleOffsetThatTheSelectedCircleIsMovingTowards() {
    const circle = retrieveCircleThatTheSelectedCircleIsMovingTowards()
    if (lastCircleThatTheSelectedCircleWasMovingTowards && circle !== lastCircleThatTheSelectedCircleWasMovingTowards) {
      removeLastCircleThatTheSelectedCircleWasMovingTowardsOffset()
    }
    if (circle) {
      const { x, y } = selectedCircleOffset
      const absoluteX = Math.abs(x)
      const absoluteY = Math.abs(y)
      const translateX = absoluteX > absoluteY ? -x : 0
      const translateY = absoluteY > absoluteX ? -y : 0
      circle.style.transform = `translate(${translateX}px, ${translateY}px)`
    }
    lastCircleThatTheSelectedCircleWasMovingTowards = circle
  }

  function retrieveCircleThatTheSelectedCircleIsMovingTowards() {
    const { x, y } = selectedCircleOffset
    if (x !== 0 || y !== 0) {
      const absoluteX = Math.abs(x)
      const absoluteY = Math.abs(y)
      const rowOffset = absoluteY > absoluteX ? (y > 0 ? 1 : -1) : 0
      const columnOffset = absoluteX > absoluteY ? (x > 0 ? 1 : -1) : 0
      const offset = {
        row: rowOffset,
        column: columnOffset,
      }
      const circle = retrieveCircleWithOffsetToOtherCircle(firstSelectedCircle, offset)
      return circle
    } else {
      return null
    }
  }

  function removeSelectedCircleOffset() {
    removeCircleOffset(firstSelectedCircle)
  }

  function removeLastCircleThatTheSelectedCircleWasMovingTowardsOffset() {
    if (lastCircleThatTheSelectedCircleWasMovingTowards) {
      removeCircleOffset(lastCircleThatTheSelectedCircleWasMovingTowards)
    }
  }

  function removeCircleOffset(circle) {
    circle.style.transform = null
  }

  function removeCircle(circle) {
    const column = circle.parentElement
    circle.remove()
    const newCircle = createCircleWithRandomColor(colors)
    column.appendChild(newCircle)
  }

  function drawConnectionLine(circleA, circleB) {
    context.beginPath()
    const { x: x1, y: y1 } = calculateElementCenter(circleA)
    context.moveTo(x1, y1)
    const { x: x2, y: y2 } = calculateElementCenter(circleB)
    context.lineTo(x2, y2)
    context.stroke()
  }

  function retrieveCircleWithOffsetToOtherCircle(otherCircle, offset) {
    const otherCirclePosition = determinePosition(otherCircle)
    const circlePosition = {
      row: otherCirclePosition.row + offset.row,
      column: otherCirclePosition.column + offset.column,
    }
    const circle = retrieveCircleAtPosition(circlePosition)
    return circle
  }

  function retrieveCircleAtPosition(position) {
    const { row, column } = position
    if (row < rows && column < columns) {
      const allCirclesColumns = circleGrid.querySelectorAll('.circles-column')
      const circlesColumn = allCirclesColumns[column]
      const circlesInColumn = circlesColumn.children
      const circle = circlesInColumn[circlesInColumn.length - 1 - row]
      return circle
    } else {
      return null
    }
  }

  function swapCircles(circleA, circleB) {
    const circleAColorClass = determineCircleColorClass(circleA)
    const circleBColorClass = determineCircleColorClass(circleB)
    circleA.classList.remove(circleAColorClass)
    circleB.classList.remove(circleBColorClass)
    circleA.classList.add(circleBColorClass)
    circleB.classList.add(circleAColorClass)
  }

  function determineCirclesWithSameColorInDirection(color, startPosition, offset) {
    const circles = new Set()
    let position = determinePositionRelativeTo(startPosition, offset)
    while (position.row < rows && position.column < columns) {
      const circle = retrieveCircleAtPosition(position)
      const hasCircleSameColor = determineCircleColor(circle) === color
      if (hasCircleSameColor) {
        circles.add(circle)
      } else {
        break
      }

      position = determinePositionRelativeTo(position, offset)
    }

    return circles
  }
}

function canBeConnected(circleA, circleB) {
  const positionA = determinePosition(circleA)
  const positionB = determinePosition(circleB)
  const rowDifference = Math.abs(positionA.row - positionB.row)
  const columnDifference = Math.abs(positionA.column - positionB.column)
  return (rowDifference === 0 && columnDifference === 1) || (columnDifference === 0 && rowDifference === 1)
}

function determinePosition(circle) {
  return {
    row: (circle.offsetTop - CIRCLE_MARGIN) / (CIRCLE_BORDER + CIRCLE_HEIGHT + CIRCLE_BORDER + SPACE_BETWEEN_CIRCLES),
    column:
      (circle.offsetLeft - CIRCLE_MARGIN) / (CIRCLE_BORDER + CIRCLE_WIDTH + CIRCLE_BORDER + SPACE_BETWEEN_CIRCLES),
  }
}

function determinePositionRelativeTo(position, offset) {
  return {
    row: position.row + offset.row,
    column: position.column + offset.column,
  }
}

function determineCircleColor(circle) {
  return extractColorName(determineCircleColorClass(circle))
}

function determineCircleColorClass(circle) {
  return Array.from(circle.classList).find(className => className.includes('--'))
}

function extractColorName(colorClass) {
  return colorClass.split('--')[1]
}

function hasSquareBeenSelected(selectedCircles, numberOfColumns) {
  if (selectedCircles.size === 4) {
    const positions = Array.from(selectedCircles).map(determinePosition)
    positions.sort((a, b) => calculateIndex(a, numberOfColumns) - calculateIndex(b, numberOfColumns))
    return (
      positions[0].row === positions[1].row &&
      positions[0].column === positions[1].column - 1 &&
      positions[2].row === positions[3].row &&
      positions[2].column === positions[3].column - 1 &&
      positions[0].row === positions[2].row - 1
    )
  } else {
    return false
  }
}

function calculateIndex(position, numberOfColumns) {
  return position.row * numberOfColumns + position.column
}

function calculateElementCenter(element) {
  return {
    x: element.offsetLeft + 0.5 * element.clientWidth,
    y: element.offsetTop + 0.5 * element.clientHeight,
  }
}

function spawnCircles(element, { rows, columns, colors }) {
  for (let column = 0; column < columns; column++) {
    const $column = document.createElement('div')
    $column.classList.add('circles-column')
    element.appendChild($column)
    for (let row = 0; row < rows; row++) {
      const circle = createCircleWithRandomColor(colors)
      $column.appendChild(circle)
    }
  }
}

function createCircleWithRandomColor(colors) {
  const color = generateRandomColor(colors)
  const circle = createCircle({ color })
  return circle
}

function createCircle({ color }) {
  const circle = document.createElement('div')
  circle.classList.add('circle')
  circle.classList.add(`circle--${color}`)
  return circle
}

function generateRandomColor(colors) {
  return selectRandomUniform(colors)
}

function union(...sets) {
  const unionSet = new Set()

  for (const set of sets) {
    for (const value of set) {
      unionSet.add(value)
    }
  }

  return unionSet
}
