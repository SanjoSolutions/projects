import { animate } from './animate.js'
import { colorToString } from './colorToString.js'
import { createFullDocumentCanvas } from './createFullDocumentCanvas.js'
import { getCenter } from './getCenter.js'
import { polarCoordinatesToCartesianCoordinates } from './polarCoordinatesToCartesianCoordinates.js'
import { radianToDegrees } from './radianToDegrees.js'

const { canvas, context } = createFullDocumentCanvas()
document.body.appendChild(canvas)

const maxRadius = 200
const minRadius = 0.2 * maxRadius
let radius = maxRadius
let radiusDelta = -1
let angle = 0
let angleDelta = (
  0.5 *
  (
    (
      2 * Math.PI
    ) / 360
  )
)
const points = []
animate(() => {
  points.push({ radius, angle })

  drawTacka(canvas, context, { radius, angle, minRadius, maxRadius, points })

  angle =
    (
      angle + angleDelta
    ) %
    (
      4 * 2 * Math.PI
    )
  if (Math.abs(angle) < angleDelta) {
    angleDelta /= 2
    // FIXME: Seems to only half the first time.
    // FIXME: Seems to slow down to half of the speed.
    //        Same speed as initially please.
  }
  radius += radiusDelta
  if (radius <= minRadius) {
    radiusDelta = 1
  } else if (radius >= maxRadius) {
    radiusDelta = -1
  }
})

function drawTacka (canvas, context, { radius, angle, minRadius, maxRadius, points }) {
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

  drawPointsLine(canvas, context, points, { minRadius })

  context.beginPath()
  context.moveTo(center.x, center.y)
  context.lineTo(
    center.x + radius * Math.cos(angle),
    center.y + radius * Math.sin(angle),
  )
  context.stroke()

  context.restore()
}

function drawPointsLine (canvas, context, points) {
  if (points.length >= 1) {
    const origin = getCenter()

    context.save()

    context.lineWidth = 1

    let lastPoint = points[0]
    let { x: previousX, y: previousY } = polarCoordinatesToCartesianCoordinates({
      ...lastPoint,
      origin,
    })
    points.forEach(point => {
      context.beginPath()
      context.moveTo(previousX, previousY)
      const color = {
        hue: Math.round(radianToDegrees((
          lastPoint.angle + point.angle
        ) / 2)),
        saturation: 1,
        lightness: 0.5,
      }
      context.strokeStyle = colorToString(color)
      const { x, y } = polarCoordinatesToCartesianCoordinates({ ...point, origin })
      context.lineTo(x, y)
      context.stroke()
      lastPoint = point
      previousX = x
      previousY = y
    })

    context.restore()
  }
}

function drawPointsFilled (canvas, context, points, { minRadius }) {
  if (points.length >= 1) {
    const origin = getCenter()

    context.save()

    context.lineWidth = 1

    points.forEach(point => {
      context.beginPath()
      const color = {
        hue: Math.round(radianToDegrees(point.angle)),
        saturation: 1,
        lightness: 0.5,
      }
      context.strokeStyle = colorToString(color)
      const { x: startX, y: startY } = polarCoordinatesToCartesianCoordinates(
        { ...point, radius: minRadius, origin },
      )
      context.moveTo(startX, startY)
      const { x, y } = polarCoordinatesToCartesianCoordinates({ ...point, origin })
      context.lineTo(x, y)
      context.stroke()
    })

    context.restore()
  }
}
