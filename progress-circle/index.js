import { animate } from "../packages/animate/animate.js"

function normalizeProgress(progress) {
  return Math.max(0, Math.min(progress, 1))
}

function createProgressCircle({ width, height, progress, label }) {
  progress = normalizeProgress(progress)

  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext("2d")

  const color = "greenyellow"
  context.lineWidth = 20
  context.strokeStyle = color
  context.fillStyle = color
  context.font = "2.5rem sans-serif"

  const startAngle = (3 / 4) * 2 * Math.PI

  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height)

    const center = { x: canvas.width / 2, y: canvas.height / 2 }
    const radius = 0.5 * Math.min(canvas.width, canvas.height)

    context.beginPath()
    context.arc(
      center.x,
      center.y,
      radius - 0.5 * context.lineWidth,
      startAngle,
      startAngle + progress * 2 * Math.PI,
    )
    context.stroke()

    if (label) {
      const text = `${Math.round(progress * 100)}%`
      context.beginPath()
      const textMetrics = context.measureText(text)
      const textWidth =
        Math.abs(textMetrics.actualBoundingBoxLeft) +
        Math.abs(textMetrics.actualBoundingBoxRight)
      const textHeight =
        textMetrics.actualBoundingBoxAscent +
        textMetrics.actualBoundingBoxDescent
      context.fillText(
        text,
        center.x - 0.5 * textWidth,
        center.y + 0.5 * textHeight,
      )
    }
  }

  draw()

  return {
    get element() {
      return canvas
    },

    get progress() {
      return progress
    },

    set progress(value) {
      value = normalizeProgress(value)
      const { stop } = animate((elapsedTime) => {
        if (Math.abs(progress - value) < 0.01) {
          progress = value
          draw()
          stop()
        } else {
          const delta =
            (elapsedTime / (1000 / 60)) * (value > progress ? 0.01 : -0.01)
          progress = progress + delta
          draw()
        }
      })
    },
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const progressCircle = createProgressCircle({
    width: 200,
    height: 200,
    progress: 0,
    label: true,
  })
  window.progressCircle = progressCircle
  document.body.appendChild(progressCircle.element)
})
