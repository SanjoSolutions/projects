import { animate } from '../animate.js'

function createProgressBar ({width, height, progress}) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')

  function draw () {
    context.clearRect(0, 0, canvas.width, canvas.height)

    context.beginPath()
    context.strokeStyle = 'greenyellow'
    context.fillStyle = 'greenyellow'
    context.fillRect(0, 0, progress * canvas.width, canvas.height)
    context.beginPath()
    context.lineWidth = 1
    context.rect(
      0.5 * context.lineWidth,
      0.5 * context.lineWidth,
      canvas.width - context.lineWidth,
      canvas.height - context.lineWidth
    )
    context.stroke()
  }

  draw()

  return {
    get element () {
      return canvas
    },

    set progress (value) {
      const {stop} = animate((elapsedTime) => {
        if (Math.abs(progress - value) < 0.01) {
          progress = value
          draw()
          stop()
        } else {
          const delta = (elapsedTime / (1000 / 60)) * (value > progress ? 0.01 : -0.01)
          progress += delta
          draw()
        }
      })
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const progressBar = createProgressBar({width: 500, height: 20, progress: 0.10})
  window.progressBar = progressBar
  document.body.appendChild(progressBar.element)
})
