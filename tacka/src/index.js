import animate from '@sanjo/animate'
import { createFullDocumentCanvas } from '@sanjo/canvas'
import { colorToString } from '../../colorToString.js'
import { convertRadiansToDegrees } from '../../convertRadiansToDegrees.js'
import { getCenter } from '../../getCenter.js'
import { polarCoordinatesToCartesianCoordinates } from '../../polarCoordinatesToCartesianCoordinates.js'

const { canvas, context } = createFullDocumentCanvas()
document.body.appendChild(canvas)

const maxRadius = 200
const minRadius = 0.2 * maxRadius
let radius = maxRadius
let radiusDelta = -1
let angle = 0
let angleDelta = 0.5 * ((2 * Math.PI) / 360)
let previousPoint = { radius, angle }

const drawCanvas = document.createElement('canvas')
drawCanvas.width = 2 * maxRadius + 2 * 1
drawCanvas.height = drawCanvas.width
const drawContext = drawCanvas.getContext('2d')
drawContext.lineWidth = 1

const origin = {
  x: drawCanvas.width / 2,
  y: drawCanvas.height / 2,
}

animate(() => {
  drawContext.beginPath()
  const { x: previousX, y: previousY } = polarCoordinatesToCartesianCoordinates({
    ...previousPoint,
    origin,
  })
  drawContext.moveTo(previousX, previousY)
  const point = { radius, angle }
  const color = {
    hue: Math.round(convertRadiansToDegrees((previousPoint.angle + point.angle) / 2)),
    saturation: 1,
    lightness: 0.5,
  }
  drawContext.strokeStyle = colorToString(color)
  const { x, y } = polarCoordinatesToCartesianCoordinates({
    ...point,
    origin,
  })
  drawContext.lineTo(x, y)
  drawContext.stroke()
  previousPoint = point

  drawTacka(canvas, context, drawCanvas, { radius, angle, minRadius, maxRadius })

  angle = (angle + angleDelta) % (4 * 2 * Math.PI)
  if (Math.abs(angle) < angleDelta) {
    angleDelta /= 2
  }
  radius += radiusDelta
  if (radius <= minRadius) {
    radiusDelta = 1
  } else if (radius >= maxRadius) {
    radiusDelta = -1
  }
})

function drawTacka(canvas, context, drawCanvas, { radius, angle, minRadius, maxRadius }) {
  const center = getCenter()
  context.save()

  context.lineWidth = 1
  context.lineCap = 'round'
  context.fillStyle = 'white'
  context.strokeStyle = 'black'

  context.beginPath()
  context.arc(center.x, center.y, maxRadius, 0, 2 * Math.PI)
  context.fill()
  context.stroke()

  context.beginPath()
  context.arc(center.x, center.y, minRadius, 0, 2 * Math.PI)
  context.fill()
  context.stroke()

  context.drawImage(
    drawCanvas,
    0.5 * canvas.width - 0.5 * drawCanvas.width,
    0.5 * canvas.height - 0.5 * drawCanvas.height
  )

  context.beginPath()
  context.moveTo(center.x, center.y)
  context.lineTo(center.x + radius * Math.cos(angle), center.y + radius * Math.sin(angle))
  context.stroke()

  context.restore()
}
