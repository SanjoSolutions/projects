import { animate } from '../animate.js'

function createProgressBar ({borderRadius, progress}) {
  const progressBar = document.createElement('div')
  progressBar.style.border = '1px solid greenyellow'
  progressBar.style.borderRadius = borderRadius
  progressBar.style.overflow = 'hidden'

  const progressBarFilling = document.createElement('div')
  progressBarFilling.style.width = progress * 100 + '%'
  progressBarFilling.style.height = '100%'
  progressBarFilling.style.backgroundColor = 'greenyellow'
  progressBarFilling.style.transitionProperty = 'width'
  progressBar.appendChild(progressBarFilling)

  return {
    get element () {
      return progressBar
    },

    set progress (value) {
      progress = value
      const currentValue = parseInt(progressBarFilling.style.width, 10) / parseInt(progressBar.style.width, 10)
      progressBarFilling.style.transitionDuration = Math.abs(value - currentValue) / 0.01 * (1000 / 60) + 'ms'
      progressBarFilling.style.width = progress * 100 + '%'
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const progressBar = createProgressBar({borderRadius: '9px', progress: 0.10})
  progressBar.element.style.width = 500 + 'px'
  progressBar.element.style.height = 20 + 'px'
  window.progressBar = progressBar
  document.body.appendChild(progressBar.element)
})
