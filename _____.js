import { animate } from './animate.js'
import { colorToString } from './colorToString.js'
import { createFullDocumentCanvas } from './createFullDocumentCanvas.js'
import { getCenter } from './getCenter.js'
import { partial } from './partial.js'
import { polarCoordinatesToCartesianCoordinates } from './polarCoordinatesToCartesianCoordinates.js'
import { randomColor } from './randomColor.js'
import { randomFloat } from './randomFloat.js'
import { randomInteger } from './randomInteger.js'

let mouseX = window.innerWidth / 2

const { canvas, context } = createFullDocumentCanvas()
document.body.appendChild(canvas)

let _____ = []

let remainingFrames = 0
animate((elapsedTime) => {
  const frames = remainingFrames + 1
  const spawnsPerFrame = 0.25
  const count = Math.floor(spawnsPerFrame * frames)
  remainingFrames = frames - count / spawnsPerFrame

  const spawns = []
  for (let counter = 1; counter <= count; counter++) {
    for (const ____ of _____) {
      if (____.radius >= 2 && Math.random() < 0.1) {
        const newSpawnMass = Math.floor(____.radius / 2)
        ____.radius -= newSpawnMass
        const origin = polarCoordinatesToCartesianCoordinates(____.coordinates)
        spawns.push(spawn____({
          origin,
          radius: newSpawnMass,
          fillStyle: ____.fillStyle,
          strokeStyle: ____.strokeStyle,
        }))
      }
    }
  }
  _____.push(...spawns)

  const origin = getCenter()
  for (let counter = 1; counter <= count; counter++) {
    _____.push(spawn____({ origin }))
  }

  draw(canvas, context, _____)

  _____ =
    _____.map(____ => (
      {
        ...____,
        coordinates: {
          ...____.coordinates,
          radius: ____.coordinates.radius + 1,
        },
      }
    ))

  _____ = _____.filter(({ coordinates, radius, lineWidth }) => {
    const { x, y } = polarCoordinatesToCartesianCoordinates(coordinates)
    const theLineWidth = lineWidth || context.lineWidth || 1
    const effectiveRadius = radius + 0.5 * theLineWidth
    return (
      0 <= x - effectiveRadius &&
      x + effectiveRadius <= window.innerWidth - 1 &&
      0 <= y - effectiveRadius &&
      y + effectiveRadius <= window.innerHeight - 1
    )
  })
})

window.addEventListener('mousemove', (event) => {
  mouseX = event.pageX
})

function spawn____ ({ origin, radius, fillStyle, strokeStyle }) {
  const ____ = {
    coordinates: {
      origin,
      angle: randomFloat(0, 2 * Math.PI),
      radius: 0,
    },
    radius: radius || randomInteger(1, 10),
    fillStyle: fillStyle || null,
    strokeStyle: strokeStyle || null,
  }
  if (!fillStyle || !strokeStyle) {
    const color = randomColor()
    if (!fillStyle) {
      ____.fillStyle = colorToString(color)
    }
    if (!strokeStyle) {
      ____.strokeStyle = colorToString({ ...color, lightness: 0.4 })
    }
  }
  return ____
}

function draw (canvas, context, _____) {
  // clear()
  context.save()
  context.fillStyle = 'black'
  context.fillRect(0, 0, mouseX, window.innerHeight)
  context.fillStyle = 'white'
  context.fillRect(mouseX, 0, window.innerWidth - mouseX, window.innerHeight)
  context.restore()
  _____.forEach(partial(draw____, canvas, context))
}

function clear () {
  context.clearRect(0, 0, canvas.width / devicePixelRatio, canvas.height / devicePixelRatio)
}

function draw____ (canvas, context, { coordinates, radius, fillStyle, strokeStyle }) {
  drawCircle({
    coordinates,
    radius,
    fillStyle: fillStyle,
    fill: true,
    lineWidth: 1,
    strokeStyle: strokeStyle,
    stroke: true,
  })
}

function drawCircle ({ coordinates, radius, fillStyle, strokeStyle, lineWidth, fill, stroke }) {
  if (fill || stroke) {
    const { x, y } = polarCoordinatesToCartesianCoordinates(coordinates)
    context.save()
    if (fillStyle) {
      context.fillStyle = fillStyle
    }
    if (strokeStyle) {
      context.strokeStyle = strokeStyle
    }
    if (lineWidth) {
      context.lineWidth = lineWidth
    }
    context.beginPath()
    context.arc(x, y, radius, 0, 2 * Math.PI)
    if (fill) {
      context.fill()
    }
    if (stroke) {
      context.stroke()
    }
    context.restore()
  }
}

