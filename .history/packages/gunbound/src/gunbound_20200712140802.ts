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
    7 / 32
  ) *
  (
    2 * Math.PI
  )  // in rad (radian)
const speed = 0.3 // m / s (meter per second)
const power = 100  // in N (Newton)
const dx = 100
const dy = 0

// später
const windSpeed = 10 // m / s (meter per second)
const windDirection = 0  // in rad (radian)

const canvas = document.querySelector('canvas') as HTMLCanvasElement
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const context = canvas.getContext('2d') as CanvasRenderingContext2D

const point: Point = { x: 0, y: 0 }

let passedTime = 0

animate((ellapsedTime: number) => {
  if (ellapsedTime === 0) {
    return
  }

  passedTime += ellapsedTime
  const ellapsedTimeInSeconds = ellapsedTime / 1000

  const deltaX = (
    speed * meterToPixelRatio / ellapsedTimeInSeconds
  ) * Math.cos(angle)
  const deltaY = (
    speed * meterToPixelRatio / ellapsedTimeInSeconds
  ) * Math.sin(angle)

  point.x += deltaX
  point.y += deltaY - gravityOfEarth * meterToPixelRatio * passedTime / 1000

  console.log(point.x, point.y)

  // Draw
  clearCanvas()
  drawProjectile(point)
})

function clearCanvas (): void {
  context.clearRect(0, 0, canvas.width, canvas.height)
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
