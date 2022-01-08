export function createLineToLine({ width, height, color, backgroundColor }) {
  const lineWidth = 0.45 * width
  const connectionLineWidth = 0.1 * width

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const context = canvas.getContext('2d')

  context.strokeStyle = color || 'black'
  context.lineWidth = 1

  if (backgroundColor) {
    context.fillStyle = backgroundColor
    context.fillRect(0, 0, width, height)
  }

  context.moveTo(0, height - 0.5 * context.lineWidth)
  context.lineTo(lineWidth, height - 0.5 * context.lineWidth)
  context.lineTo(lineWidth + connectionLineWidth, 0.5 * context.lineWidth)
  context.lineTo(width, 0.5 * context.lineWidth)
  context.stroke()

  return {
    get element() {
      return canvas
    },
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const options = { width: 496, height: 32, color: 'yellow' }
  const container = document.createElement('div')
  container.style.width = options.width + 'px'
  container.style.padding = '1rem'
  container.style.backgroundColor = 'black'
  const lineToLine = createLineToLine(options)
  container.appendChild(lineToLine.element)
  document.body.appendChild(container)
})
