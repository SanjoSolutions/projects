import debounce from 'lodash.debounce'
import once from 'lodash.once'
import { selectRandomUniform } from '../../selectRandomUniform.js'

const CIRCLE_MARGIN = 4 // 0.25rem with 1rem = 16px
const SPACE_BETWEEN_CIRCLES = 2 * CIRCLE_MARGIN
const CIRCLE_LENGTH = 32 // 2rem with 1rem = 16px
const CIRCLE_WIDTH = CIRCLE_LENGTH
const CIRCLE_HEIGHT = CIRCLE_LENGTH
const CIRCLE_BORDER = 1 // px
const MAXIMUM_MOVE_DISTANCE = CIRCLE_LENGTH + 2 * CIRCLE_BORDER + SPACE_BETWEEN_CIRCLES
const DISTANCE_THRESHOLD = 0.5 * (CIRCLE_LENGTH + 2 * CIRCLE_BORDER + SPACE_BETWEEN_CIRCLES) // px
const MINIMUM_AMOUNT_OF_CIRCLES_ON_SAME_LINE_FOR_REMOVAL = 3

export function main() {
  const numberOfRows = 20
  const numberOfColumns = 20
  const colors = ['red', 'green', 'yellow', 'blue']
  const circleGrid = document.querySelector('.circle-grid')
  spawnCircles(circleGrid, { rows: numberOfRows, columns: numberOfColumns, colors })

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
        if (hasSquareBeenSelected(selectedCircles, numberOfColumns)) {
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
        const { x: offsetX, y: offsetY } = determineSelectedCircleOffset()
        const distanceMoved = Math.abs(offsetX + offsetY)
        if (distanceMoved > DISTANCE_THRESHOLD) {
          swapCircles(firstSelectedCircle, lastCircleThatTheSelectedCircleWasMovingTowards)

          let circlesToRemove = new Set()
          for (const circle of new Set([firstSelectedCircle, lastCircleThatTheSelectedCircleWasMovingTowards])) {
            let circlesToRemovePart = new Set()
            const color = determineCircleColor(circle)
            const startPosition = determinePosition(circle)
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
              if (circlesWithSameColor.size >= MINIMUM_AMOUNT_OF_CIRCLES_ON_SAME_LINE_FOR_REMOVAL - 1) {
                circlesToRemovePart = union(circlesToRemovePart, circlesWithSameColor)
              }
            }
            if (circlesToRemovePart.size >= 1) {
              circlesToRemovePart.add(circle)
            }
            circlesToRemove = union(circlesToRemove, circlesToRemovePart)
          }

          removeCircles(circlesToRemove)
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
    const { x: translateX, y: translateY } = determineSelectedCircleOffset()
    firstSelectedCircle.style.transform = `translate(${translateX}px, ${translateY}px)`
  }

  function determineSelectedCircleOffset() {
    return determineNormalizedCircleOffset(selectedCircleOffset)
  }

  function determineNormalizedCircleOffset(offset) {
    const { x, y } = offset
    const absoluteX = Math.abs(x)
    const absoluteY = Math.abs(y)
    const normalizedX = absoluteX > absoluteY ? Math.sign(x) * Math.min(Math.abs(x), MAXIMUM_MOVE_DISTANCE) : 0
    const normalizedY = absoluteY > absoluteX ? Math.sign(y) * Math.min(Math.abs(y), MAXIMUM_MOVE_DISTANCE) : 0
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
      const selectedCircleOffset = determineSelectedCircleOffset()
      const translateX = -selectedCircleOffset.x
      const translateY = -selectedCircleOffset.y
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

  function removeConnectedCircles() {
    let circlesToRemove = new Set()
    const circles = circleGrid.querySelectorAll('.circle')
    for (const circle of circles) {
      const color = determineCircleColor(circle)
      const startPosition = determinePosition(circle)
      const offsets = new Set([
        { row: 0, column: 1 },
        { row: 1, column: 0 },
      ])
      for (const offset of offsets) {
        const circlesWithSameColorOnLine = determineCirclesWithSameColorInDirectionIncludingTheStartPosition(
          color,
          startPosition,
          offset
        )
        if (circlesWithSameColorOnLine.size >= MINIMUM_AMOUNT_OF_CIRCLES_ON_SAME_LINE_FOR_REMOVAL) {
          circlesToRemove = union(circlesToRemove, circlesWithSameColorOnLine)
        }
      }
    }

    removeCircles(circlesToRemove)
  }

  function removeCircleOffset(circle) {
    circle.style.transform = null
  }

  function removeCircles(circlesToRemove) {
    if (circlesToRemove.size >= 1) {
      let circlesThatFall = new Set()
      for (const circle of circlesToRemove) {
        circle.classList.add('circle--hidden')
      }
      const circlesThatAreRemovedGroupedByColumn = groupCirclesIntoColumns(circlesToRemove)
      const maximumFallOffset =
        Math.max(...Array.from(circlesThatAreRemovedGroupedByColumn).map(column => column.size)) *
        (CIRCLE_HEIGHT + 2 * CIRCLE_BORDER + SPACE_BETWEEN_CIRCLES)
      circleGrid.style.top = `${-maximumFallOffset}px`
      const circlesThatFallGroupedByColumn = new Array(numberOfColumns)
      for (let columnIndex = 0; columnIndex < circlesThatAreRemovedGroupedByColumn.length; columnIndex++) {
        const circlesThatAreRemovedInColumn = circlesThatAreRemovedGroupedByColumn[columnIndex]
        if (circlesThatAreRemovedInColumn.size >= 1) {
          const circlesThatFallInColumn = determineCirclesThatFallInColumn(columnIndex, circlesThatAreRemovedInColumn)
          circlesThatFall = union(circlesThatFall, circlesThatFallInColumn)

          const columns = circleGrid.children
          const column = columns[columnIndex]
          const numberOfCirclesToAddToColumn = circlesThatAreRemovedInColumn.size
          for (let i = 1; i <= numberOfCirclesToAddToColumn; i++) {
            const newCircle = createCircleWithRandomColor(colors)
            column.appendChild(newCircle)
            circlesThatFallInColumn.add(newCircle)
            circlesThatFall.add(newCircle)
          }

          circlesThatFallGroupedByColumn[columnIndex] = circlesThatFallInColumn
        } else {
          circlesThatFallGroupedByColumn[columnIndex] = new Set()
        }
      }

      requestAnimationFrame(() => {
        for (const circle of circlesThatFall) {
          circle.classList.add('circle--falling')
        }
        requestAnimationFrame(() => {
          const onTransitionEnd = debounce(
            once(function onTransitionEnd() {
              circleGrid.style.top = '0px'
              circleGrid.removeEventListener('transitionend', onTransitionEnd)

              for (const circle of circlesToRemove) {
                circle.remove()
              }

              for (const circle of circlesThatFall) {
                circle.classList.remove('circle--falling')
                circle.style.top = null
              }

              requestAnimationFrame(removeConnectedCircles)
            })
          )
          circleGrid.addEventListener('transitionend', onTransitionEnd)

          for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
            const circlesThatFallInColumn = circlesThatFallGroupedByColumn[columnIndex]
            for (const circleThatFallsInColumn of circlesThatFallInColumn) {
              const circleThatFallsInColumnRow = determinePosition(circleThatFallsInColumn).row
              const circlesThatAreRemovedInColumn = circlesThatAreRemovedGroupedByColumn[columnIndex]
              const numberOfCirclesThatAreRemovedBelowCircle = Array.from(circlesThatAreRemovedInColumn).filter(
                circle => determinePosition(circle).row > circleThatFallsInColumnRow
              ).length
              const fallOffset =
                numberOfCirclesThatAreRemovedBelowCircle * (CIRCLE_HEIGHT + 2 * CIRCLE_BORDER + SPACE_BETWEEN_CIRCLES)
              circleThatFallsInColumn.style.top = `${fallOffset}px`
            }
          }
        })
      })
    }
  }

  function groupCirclesIntoColumns(circles) {
    const columns = new Array(numberOfColumns)
    for (let index = 0; index < columns.length; index++) {
      columns[index] = new Set()
    }
    for (const circle of circles) {
      const { column } = determinePosition(circle)
      columns[column].add(circle)
    }
    return columns
  }

  function determineCirclesThatFallInColumn(column, circlesThatAreRemovedInColumn) {
    const circlesThatFall = new Set()
    let biggestRowOfCirclesThatFall = Math.max(
      ...Array.from(circlesThatAreRemovedInColumn).map(circle => determinePosition(circle).row)
    )
    let row = 0
    while (row < biggestRowOfCirclesThatFall) {
      const circle = retrieveCircleAtPosition({
        row,
        column,
      })
      if (circle && !circlesThatAreRemovedInColumn.has(circle)) {
        circlesThatFall.add(circle)
      }
      row++
    }
    return circlesThatFall
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
    if (row >= 0 && row < numberOfRows && column >= 0 && column < numberOfColumns) {
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
    while (position.row < numberOfRows && position.column < numberOfColumns) {
      const circle = retrieveCircleAtPosition(position)
      if (circle) {
        const hasCircleSameColor = determineCircleColor(circle) === color
        if (hasCircleSameColor) {
          circles.add(circle)
        } else {
          break
        }
      } else {
        break
      }

      position = determinePositionRelativeTo(position, offset)
    }

    return circles
  }

  function determineCirclesWithSameColorInDirectionIncludingTheStartPosition(color, startPosition, offset) {
    const circles = new Set()
    let position = startPosition
    while (position.row < numberOfRows && position.column < numberOfColumns) {
      const circle = retrieveCircleAtPosition(position)
      if (circle) {
        const hasCircleSameColor = determineCircleColor(circle) === color
        if (hasCircleSameColor) {
          circles.add(circle)
        } else {
          break
        }
      } else {
        break
      }

      position = determinePositionRelativeTo(position, offset)
    }

    return circles
  }

  function spawnCircles(element, { rows, columns, colors }) {
    for (let column = 0; column < columns; column++) {
      const $column = document.createElement('div')
      $column.classList.add('circles-column')
      element.appendChild($column)

      for (let row = 0; row < rows; row++) {
        const colorCandidates = new Set(colors)
        if (column >= 2) {
          const circlesToTheLeft = [
            retrieveCircleAtPosition({
              row: numberOfRows - 1 - row,
              column: column - 1,
            }),
            retrieveCircleAtPosition({
              row: numberOfRows - 1 - row,
              column: column - 2,
            }),
          ]
          if (areAllEqual(circlesToTheLeft.map(circle => determineCircleColor(circle)))) {
            const color = determineCircleColor(circlesToTheLeft[0])
            colorCandidates.delete(color)
          }
        }
        if (row >= 2) {
          const circlesBelow = [
            $column.children[$column.children.length - 1],
            $column.children[$column.children.length - 2],
          ]
          if (areAllEqual(circlesBelow.map(circle => determineCircleColor(circle)))) {
            const color = determineCircleColor(circlesBelow[0])
            colorCandidates.delete(color)
          }
        }
        const circle = createCircleWithRandomColor(Array.from(colorCandidates))
        $column.appendChild(circle)
      }
    }
  }

  function determinePosition(circle) {
    const column = circle.parentElement
    const columns = Array.from(circleGrid.children)
    const columnIndex = columns.indexOf(column)
    const circlesInColumn = Array.from(column.children)
    const rowIndex = circlesInColumn.length - 1 - circlesInColumn.indexOf(circle)

    return {
      row: rowIndex,
      column: columnIndex,
    }
  }

  window.removeConnectedCircles = removeConnectedCircles
}

function canBeConnected(circleA, circleB) {
  const positionA = determinePosition(circleA)
  const positionB = determinePosition(circleB)
  const rowDifference = Math.abs(positionA.row - positionB.row)
  const columnDifference = Math.abs(positionA.column - positionB.column)
  return (rowDifference === 0 && columnDifference === 1) || (columnDifference === 0 && rowDifference === 1)
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

function areAllEqual(elements) {
  return new Set(elements).size === 1
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
