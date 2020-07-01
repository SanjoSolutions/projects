import { createFullDocumentCanvas } from './createFullDocumentCanvas.js'

const a = {
  width: 600,
  height: 800,
  polygon: [
    {
      'x': '332.97',
      'y': '243.38',
    },
    {
      'x': '369.46',
      'y': '243.38',
    },
    {
      'x': '369.46',
      'y': '251.72',
    },
    {
      'x': '332.97',
      'y': '251.72',
    },
  ],
  viewportY: {
    width: 456,
    height: 591,
  },
}

function convert (points) {
  const minX = Math.min(...points.map(({ x }) => x))
  const maxX = Math.max(...points.map(({ x }) => x))
  const minY = Math.min(...points.map(({ y }) => y))
  const maxY = Math.max(...points.map(({ y }) => y))
  return {
    top: minY,
    left: minX,
    width: maxX - minX,
    height: maxY - minY,
    bottom: maxY,
    right: maxX,
  }
}

function b (a) {
  const scaleX = a.width / a.viewportY.width
  const scaleY = a.height / a.viewportY.height
  const points = a.polygon.map(({ x, y }) => (
    {
      x: scaleX * x,
      y: scaleY * y,
    }
  ))
  const minX = Math.min(...points.map(({ x }) => x))
  const maxX = Math.max(...points.map(({ x }) => x))
  const minY = Math.min(...points.map(({ y }) => y))
  const maxY = Math.max(...points.map(({ y }) => y))
  return {
    top: minY,
    left: minX,
    width: maxX - minX,
    height: maxY - minY,
    bottom: maxY,
    right: maxX,
  }
}

const input = convert(a.polygon)
const result = b(a)
const expected = {
  'top': 308.0357142857143,
  'left': 496.42857142857133,
  'width': 167.85714285714283,
  'height': 158.92857142857142,
  'bottom': 466.96428571428567,
  'right': 664.2857142857142,
}

debugger

const { canvas, context } = createFullDocumentCanvas()
document.body.appendChild(canvas)

drawBoundingBox(a.viewportY, 'blue')
drawBoundingBox(a, 'green')
drawRect(input, 'blue')
drawRect(result, 'green')
drawRect(expected, 'red')

function drawBoundingBox ({ width, height }, color) {
  context.save()
  context.lineWidth = 3
  drawRect({ left: 0, top: 0, width, height }, color)
  context.restore()
}

function drawRect (rect, color = 'black') {
  context.strokeStyle = color
  context.beginPath()
  context.rect(rect.left, rect.top, rect.width, rect.height)
  context.stroke()
}
