import { animate } from "@sanjo/animate"
import { randomColor } from "../../randomColor.js"
import { colorToString } from "../../colorToString.js"
import { Grid2D as Grid } from "../../Grid2D.js"
import { createFullDocumentCanvas } from "@sanjo/canvas"

const tileSize = 32 // 2rem
const documentWidth = window.innerWidth
const documentHeight = window.innerHeight
const grid = new Grid(
  Math.floor(documentWidth / tileSize),
  Math.floor(documentHeight / tileSize),
)

const { canvas, context } = createFullDocumentCanvas({
  onDevicePixelRatioOrDocumentSizeChange() {
    const documentWidth = window.innerWidth
    const documentHeight = window.innerHeight
    grid.resize(
      Math.floor(documentWidth / tileSize),
      Math.floor(documentHeight / tileSize),
    )
  },
})
document.body.appendChild(canvas)

animate((elapsedTime) => {
  const lightnessDelta = (10 * (elapsedTime / 1000)) / 100
  for (const [position, color] of grid.entries()) {
    if (color) {
      grid.set(position, {
        ...color,
        lightness: color.lightness + lightnessDelta,
      })
    }
  }

  const freeCells = grid
    .entries()
    .filter(([position, color]) => !color)
    .map(([position, color]) => position)
  if (freeCells.length >= 1) {
    const freeCellsIndex = Math.floor(Math.random() * freeCells.length)
    const { row, column } = freeCells[freeCellsIndex]
    const color = randomColor()
    grid.set({ row, column }, color)
  }

  context.clearRect(0, 0, canvas.width, canvas.height)
  for (const [position, color] of grid.entries()) {
    if (color) {
      drawCell(position, color)
    }
  }

  for (const [position, color] of grid.entries()) {
    if (color && color.lightness >= 1) {
      grid.set(position, undefined)
    }
  }
})

function drawCell({ row, column }, color) {
  const x = (column - 1) * tileSize
  const y = (row - 1) * tileSize
  context.fillStyle = colorToString(color)
  context.fillRect(x, y, tileSize, tileSize)
}
