import { animate } from "@sanjo/animate"
import { createFullDocumentCanvas } from "@sanjo/canvas"
import { colorToString } from "../../colorToString.js"
import { randomColor } from "../../randomColor.js"
import { randomInteger } from "../../randomInteger.js"

const radius = 20
const coverRadius = 5 * radius

const numFlowers = 100
const flowers = new Array(numFlowers)
for (let index = 0; index < numFlowers; index++) {
  flowers[index] = {
    x: randomInteger(0, window.innerWidth - 1),
    y: randomInteger(0, window.innerHeight - 1),
    color: randomColor(),
  }
}

let rainDrops = []

// dotted line    : context.setLineDash([1, 10])
// continuous line: context.setLineDash([])

const { canvas, context } = createFullDocumentCanvas()
document.body.appendChild(canvas)

let angleDelta = 0
const numRainDropsPerFrame = 80
const rainDropBaseColor = {
  hue: 208,
  saturation: 1,
  lightness: 0.87,
  alpha: 1,
}
const rainDropLifeTime = 5000
animate(() => {
  rainDrops = rainDrops.filter(
    ({ spawnTime }) => Date.now() - spawnTime <= rainDropLifeTime,
  )

  for (let index = 0; index < numRainDropsPerFrame; index++) {
    rainDrops.push({
      x: randomInteger(0, window.innerWidth - 1),
      y: randomInteger(0, window.innerHeight - 1),
      spawnTime: Date.now(),
    })
  }

  clear()

  const center = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  }

  flowers.forEach(drawFlower)

  /*
   context.lineWidth = 3
   context.lineCap = 'round'
   context.strokeStyle = 'black'
   context.fillStyle = 'black'
   context.beginPath()
   context.arc(
   center.x,
   center.y,
   radius,
   0,
   2 * Math.PI
   )
   context.fill()
   context.stroke()

   context.save()
   context.lineWidth = 1
   context.strokeStyle = 'blue'
   context.setLineDash([1, 10])
   for (let angle = angleDelta; angle < (2 * Math.PI) + angleDelta; angle += (2 * Math.PI) / 8) {
   context.beginPath()
   context.moveTo(
   center.x + (radius + 5) * Math.cos(angle),
   center.y + (radius + 5) * Math.sin(angle)
   )
   context.lineTo(
   center.x + coverRadius * Math.cos(angle),
   center.y + coverRadius * Math.sin(angle)
   )
   context.stroke()
   }
   context.restore()
   */

  rainDrops.forEach(function drawRainDrop({ x, y, spawnTime }) {
    context.fillStyle = colorToString({
      ...rainDropBaseColor,
      alpha: 1 - (Date.now() - spawnTime) / rainDropLifeTime,
    })
    context.beginPath()
    context.arc(x, y, 1, 0, 2 * Math.PI)
    context.fill()
  })

  angleDelta = (angleDelta + 0.125 * ((2 * Math.PI) / 360)) % (2 * Math.PI)
})

const flowerDingRadius = 5
const numFlowerDinger = 6

function drawFlower({ x, y, color }) {
  const angleDelta = (2 * Math.PI) / numFlowerDinger
  context.fillStyle = colorToString(color)
  for (let index = 0; index < numFlowerDinger; index++) {
    const angle = index * angleDelta
    context.beginPath()
    context.arc(
      x + flowerDingRadius * Math.cos(angle),
      y + flowerDingRadius * Math.sin(angle),
      flowerDingRadius,
      0,
      2 * Math.PI,
    )
    context.fill()
  }

  context.fillStyle = "yellow"
  context.beginPath()
  context.arc(x, y, flowerDingRadius, 0, 2 * Math.PI)
  context.fill()
}

function clear() {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight)
}
