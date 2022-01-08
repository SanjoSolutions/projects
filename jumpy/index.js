// Game model layer

const jumpLength = 120 // in frames
const jumpyDrawing = { width: 50, height: 100 }
const platformDrawing = { width: 100, height: 25 }

const jumpy = { x: 0, y: 25 }
let platforms = []
let cameraYOffset = 0
let cameraMoveToYOffset = 0

import { createFullDocumentCanvas } from '../createFullDocumentCanvas/createFullDocumentCanvas.js'
import { loadImage } from '../loadImage.js'
import { animate } from '../packages/animate/animate.js'
import { randomInteger } from '../randomInteger.js'
import { run } from '../run.js'

let platformY = 25
while (platformY < window.innerHeight) {
  const platformX = generatePlatformX()
  const platform = { x: platformX, y: platformY }
  platforms.push(platform)
  platformY = calculateNextPlatformY(platformY)
}

function generatePlatformX() {
  const maxOffsetX = window.innerWidth / 2 - platformDrawing.width
  return randomInteger(-maxOffsetX, maxOffsetX)
}

function calculateNextPlatformY(previousPlatformY) {
  return previousPlatformY + jumpLength - 20
}

let jumpData

function jump(frame) {
  jumpData = {
    startFrame: frame,
    endFrame: frame + jumpLength,
  }
}

// Drawing layer

function clearCanvas({ canvas, context }) {
  context.clearRect(0, 0, canvas.width, canvas.height)
}

function drawJumpy({ canvas, context }, jumpy, jumpyImage) {
  context.beginPath()
  const { x, y } = jumpyPositionToCanvasPosition({ canvas }, jumpy)
  context.drawImage(jumpyImage, x, y, jumpyDrawing.width, jumpyDrawing.height)
  context.stroke()
}

function jumpyPositionToCanvasPosition({ canvas }, jumpy) {
  return {
    x: jumpy.x - jumpyDrawing.width / 2 + window.innerWidth / 2,
    y: window.innerHeight - jumpy.y - jumpyDrawing.height + cameraYOffset,
  }
}

function drawPlatform({ canvas, context }, platform, platformImage) {
  context.beginPath()
  const { x, y } = platformPositionToCanvasPosition({ canvas }, platform)
  context.drawImage(platformImage, x, y, platformDrawing.width, platformDrawing.height)
  context.stroke()
}

function platformPositionToCanvasPosition({ canvas }, platform) {
  return {
    x: platform.x - platformDrawing.width / 2 + window.innerWidth / 2,
    y: window.innerHeight - platform.y + cameraYOffset,
  }
}

function drawGameOver({ canvas, context }) {
  context.save()
  context.font = '64px sans-serif'
  context.beginPath()
  const text = 'Game over!'
  const textMeasure = context.measureText(text)
  context.fillText(
    text,
    window.innerWidth / 2 - 0.5 * textMeasure.width,
    window.innerHeight / 2 + 0.5 * (textMeasure.actualBoundingBoxAscent + textMeasure.actualBoundingBoxDescent)
  )
  context.fillStyle = 'red'
  context.fillRect(window.innerWidth / 2, window.innerHeight / 2, 1, 1)
  context.restore()
}

// Main

async function main() {
  const jumpyImage = await loadImage('jumpy.png')
  const platformImage = await loadImage('platform.png')

  const { canvas, context } = createFullDocumentCanvas()
  document.body.appendChild(canvas)

  let mouseX = null
  let mouseY = null
  document.addEventListener('mousemove', event => {
    mouseX = event.pageX
    jumpy.x = mouseX - 0.5 * window.innerWidth
  })

  let frame = 0

  const { stop } = animate(() => {
    frame += 1

    if (jumpy.y - cameraYOffset <= 0) {
      drawGameOver({ canvas, context })
      stop()
    } else {
      if (cameraMoveToYOffset > cameraYOffset) {
        cameraYOffset += 1
      }

      if (jumpData) {
        jumpy.y += 1

        if (frame >= jumpData.endFrame) {
          jumpData = null
        }
      } else {
        const jumpPlatform = platforms.find(
          platform =>
            platform.y === jumpy.y &&
            platform.x - 0.5 * platformDrawing.width <= jumpy.x &&
            jumpy.x <= platform.x + 0.5 * platformDrawing.width
        )
        if (jumpPlatform) {
          cameraMoveToYOffset = jumpPlatform.y - platformDrawing.height - 20
          const currentTopmostPlatform = platforms[platforms.length - 1]
          const maxOffsetX = window.innerWidth / 2 - platformDrawing.width
          const platformX = generatePlatformX()
          platforms.push({
            x: platformX,
            y: calculateNextPlatformY(currentTopmostPlatform.y),
          })
          jump(frame)
        } else {
          jumpy.y -= 1
        }
      }

      clearCanvas({ canvas, context })
      for (const platform of platforms) {
        drawPlatform({ canvas, context }, platform, platformImage)
      }
      drawJumpy({ canvas, context }, jumpy, jumpyImage)

      platforms = platforms.filter(platform => platform.y > cameraYOffset)
    }
  })

  jump(frame)
}

run(main)
