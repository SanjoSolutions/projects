import { animate } from '../animate/animate.js'

// ## Legend
// ### Units
//
// <unit symbol> (<unit name>)

// Up to 60 fps (frames per second)

const projectile = {
  mass: 1, // kg
}

const gravityOfEarth = 9.81 // m / s^2 (meter per square second)

const meterToPixelRatio = 3 // meter to pixel (1 meter equals 10 pixel)

const angle = (
    5 / 32
  ) *
  (
    2 * Math.PI
  )  // in rad (radian)
const speed = 30 // m / s (meter per second)
const minSpeed = 0
const maxSpeed = 100
const power = 100  // in N (Newton)
const dx = 100
const dy = 0

const windSpeed = 0.1 // m / s (meter per second)
const windDirection = 0.5 *
  (
    2 * Math.PI
  )  // in rad (radian) (direction to the left)

const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const context = canvas.getContext('2d')

const initialPoint = { x: 0.5 * window.innerWidth, y: 60 }
const point = { ...initialPoint }

let passedTime = 0

let drawnSinceLastClear = false
const drawDelta = 500

animate((ellapsedTime) => {
  if (ellapsedTime === 0) {
    return
  }

  passedTime += ellapsedTime

  const passedSeconds = passedTime / 1000

  const deltaX = (
    speed * meterToPixelRatio * passedSeconds
  ) * Math.cos(angle)
  const deltaY = (
    speed * meterToPixelRatio * passedSeconds
  ) * Math.sin(angle)

  const windDeltaX = (
    windSpeed * meterToPixelRatio * passedSeconds
  ) * Math.cos(windDirection)
  const windDeltaY = (
    windSpeed * meterToPixelRatio * passedSeconds
  ) * Math.sin(windDirection)

  const x = initialPoint.x + deltaX + windDeltaX
  const y = initialPoint.y +
    deltaY +
    windDeltaY -
    0.5 *
    gravityOfEarth *
    meterToPixelRatio *
    (
      passedSeconds ** 2
    )

  // Draw
  if (drawnSinceLastClear) {
    clearCanvas()
    drawnSinceLastClear = false
  }
  if (
    -drawDelta <= x && x < window.innerWidth + drawDelta &&
    -drawDelta <= y && y < window.innerHeight + drawDelta
  ) {
    drawProjectile({ x, y })
    drawAngle()
    drawPowerBar()
    drawnSinceLastClear = true
  }
})

function clearCanvas () {
  context.save()
  context.fillStyle = 'rgba(255, 255, 255, 0.2)'
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.restore()
}

function drawProjectile ({ x, y }) {
  context.beginPath()
  context.arc(x, canvas.height - y, 10, 0, 2 * Math.PI)
  context.fill()
}

function drawAngle () {
  const radius = 10
  context.beginPath()
  context.arc(initialPoint.x, canvas.height - initialPoint.y, radius, 0, 2 * Math.PI)
  context.stroke()
  context.beginPath()
  context.moveTo(initialPoint.x, canvas.height - initialPoint.y)
  const drawAngle = 2 * Math.PI - angle
  context.lineTo(
    initialPoint.x + radius * Math.cos(drawAngle),
    canvas.height - initialPoint.y + radius * Math.sin(drawAngle),
  )
  context.stroke()
}

function drawPowerBar () {
  const barWidth = 400
  const barHeight = 16
  const margin = 10
  const x = 0.5 * window.innerWidth - 0.5 * barWidth
  const y = window.innerHeight - margin - barHeight
  context.beginPath()
  context.save()
  context.strokeStyle = '#000'
  context.fillStyle = '#ccc'
  context.rect(
    x,
    y,
    (
      (
        speed - minSpeed
      ) /
      (
        maxSpeed - minSpeed
      )
    ) * barWidth,
    barHeight,
  )
  context.fill()
  context.beginPath()
  context.rect(
    x,
    y,
    barWidth,
    barHeight,
  )
  context.stroke()
  context.restore()
}
