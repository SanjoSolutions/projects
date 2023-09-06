import { selectRandomUniform } from "../selectRandomUniform.js"

const CIRCLE_MARGIN = 4 // 0.25rem with 1rem = 16px
const SPACE_BETWEEN_CIRCLES = 2 * CIRCLE_MARGIN
const CIRCLE_LENGTH = 32 // 2rem with 1rem = 16px
const CIRCLE_WIDTH = CIRCLE_LENGTH
const CIRCLE_HEIGHT = CIRCLE_LENGTH
const CIRCLE_BORDER = 1 // px

export function main() {
  const rows = 20
  const columns = 20
  const colors = ["red", "green", "yellow", "blue"]
  const circleGrid = document.querySelector(".circle-grid")
  spawnCircles(circleGrid, { rows, columns, colors })

  const connectionLineCanvas = document.querySelector(".connection-line-canvas")
  connectionLineCanvas.width = circleGrid.clientWidth
  connectionLineCanvas.height = circleGrid.clientHeight
  const context = connectionLineCanvas.getContext("2d")

  let selectedCircles = new Set()
  let firstSelectedCircle = null
  let selectedColor = null
  let lastSelectedCircle = null

  function isSelectingCircles() {
    return lastSelectedCircle !== null
  }

  circleGrid.addEventListener("pointerdown", function (event) {
    const target = event.target
    if (target.classList.contains("circle")) {
      event.preventDefault()
      const circle = target
      selectedCircles.add(circle)
      firstSelectedCircle = circle
      selectedColor = determineCircleColor(firstSelectedCircle)
      lastSelectedCircle = circle
    }
  })

  circleGrid.addEventListener("pointermove", function (event) {
    if (isSelectingCircles()) {
      const target = event.target
      if (target.classList.contains("circle")) {
        const circle = target
        const circleColor = determineCircleColor(circle)
        if (
          circleColor === selectedColor &&
          (!selectedCircles.has(circle) ||
            (selectedCircles.size >= 3 && circle === firstSelectedCircle)) &&
          canBeConnected(circle, lastSelectedCircle)
        ) {
          drawConnectionLine(circle, lastSelectedCircle)
          selectedCircles.add(circle)
          lastSelectedCircle = circle
        }
      }
    }
  })

  window.addEventListener("pointerup", function () {
    if (selectedCircles.size >= 2) {
      if (hasSquareBeenSelected(selectedCircles, columns)) {
        const circles = circleGrid.querySelectorAll(".circle")
        for (const circle of circles) {
          if (determineCircleColor(circle) === selectedColor) {
            removeCircle(circle)
          }
        }
      } else {
        selectedCircles.forEach(removeCircle)
      }
    }

    selectedCircles = new Set()
    firstSelectedCircle = null
    selectedColor = null
    lastSelectedCircle = null
    context.clearRect(
      0,
      0,
      connectionLineCanvas.width,
      connectionLineCanvas.height,
    )
  })

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
}

function canBeConnected(circleA, circleB) {
  const positionA = determinePosition(circleA)
  const positionB = determinePosition(circleB)
  const rowDifference = Math.abs(positionA.row - positionB.row)
  const columnDifference = Math.abs(positionA.column - positionB.column)
  return (
    (rowDifference === 0 && columnDifference === 1) ||
    (columnDifference === 0 && rowDifference === 1)
  )
}

function determinePosition(circle) {
  return {
    row:
      (circle.offsetLeft - CIRCLE_MARGIN) /
      (CIRCLE_BORDER + CIRCLE_WIDTH + CIRCLE_BORDER + SPACE_BETWEEN_CIRCLES),
    column:
      (circle.offsetTop - CIRCLE_MARGIN) /
      (CIRCLE_BORDER + CIRCLE_HEIGHT + CIRCLE_BORDER + SPACE_BETWEEN_CIRCLES),
  }
}

function determineCircleColor(circle) {
  return extractColorName(determineCircleColorClass(circle))
}

function determineCircleColorClass(circle) {
  return Array.from(circle.classList).find((className) =>
    className.includes("--"),
  )
}

function extractColorName(colorClass) {
  return colorClass.split("--")[1]
}

function hasSquareBeenSelected(selectedCircles, numberOfColumns) {
  if (selectedCircles.size === 4) {
    const positions = Array.from(selectedCircles).map(determinePosition)
    positions.sort(
      (a, b) =>
        calculateIndex(a, numberOfColumns) - calculateIndex(b, numberOfColumns),
    )
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
    const $column = document.createElement("div")
    $column.classList.add("circles-column")
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
  const circle = document.createElement("div")
  circle.classList.add("circle")
  circle.classList.add(`circle--${color}`)
  return circle
}

function generateRandomColor(colors) {
  return selectRandomUniform(colors)
}
