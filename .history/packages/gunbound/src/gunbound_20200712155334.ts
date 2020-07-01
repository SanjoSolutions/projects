import animate from '@sanjo/animate'

// ## Legend
// ### Units
//
// <unit symbol> (<unit name>)

// Up to 60 fps (frames per second)

const projectile = {
  mass: 1, // kg
}

const gravityOfEarth = 9.81 // m / s^2 (meter per square second)

const meterToPixelRatio = 1 // meter to pixel (1 meter equals 10 pixel)

const angle = (
  4 / 32
) *
  (
    2 * Math.PI
  )  // in rad (radian)
const speed = 0.3 // m / s (meter per second)
const power = 100  // in N (Newton)
const dx = 100
const dy = 0

const windSpeed = 0.1 // m / s (meter per second)
const windDirection = 0.5 * (2 * Math.PI)  // in rad (radian) (direction to the left)

const canvas = document.querySelector('canvas') as HTMLCanvasElement
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const context = canvas.getContext('2d') as CanvasRenderingContext2D

const point: Point = { x: 0.5 * window.innerWidth, y: 0 }

let passedTime = 0

animate((ellapsedTime: number) => {
  if (ellapsedTime === 0) {
    return
  }

  passedTime += ellapsedTime
  const ellapsedTimeInSeconds = ellapsedTime / 1000

  const deltaX = (
    projectile.mass * speed * meterToPixelRatio / ellapsedTimeInSeconds
  ) * Math.cos(angle)
  const deltaY = (
    projectile.mass * speed * meterToPixelRatio / ellapsedTimeInSeconds
  ) * Math.sin(angle)

  const windDeltaX = (
    windSpeed * meterToPixelRatio / ellapsedTimeInSeconds
  ) * Math.cos(windDirection)
  const windDeltaY = (
    windSpeed * meterToPixelRatio / ellapsedTimeInSeconds
  ) * Math.sin(windDirection)

  point.x += deltaX + windDeltaX
  point.y += deltaY + windDeltaY - gravityOfEarth * meterToPixelRatio * passedTime / 1000

  // Draw
  clearCanvas()
  drawProjectile(point)
})

function clearCanvas (): void {
  context.save()
  context.fillStyle = 'rgba(255, 255, 255, 0.2)'
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.restore()
}

function drawProjectile ({ x, y }: Point): void {
  context.beginPath()
  context.arc(x, canvas.height - y, 10, 0, 2 * Math.PI)
  context.fill()
}

interface Point {
  x: number
  y: number
}
