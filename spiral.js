import { animate } from './animate.js'
import { createFullDocumentCanvas } from './createFullDocumentCanvas/createFullDocumentCanvas.js'
import { Drawer } from './Drawer.js'
import { getCenter } from './getCenter.js'

const goldenRatio = (1 + Math.sqrt(5)) / 2

const { canvas, context } = createFullDocumentCanvas()
const drawer = new Drawer(canvas, context)
document.body.appendChild(canvas)

context.lineWidth = 1
context.lineCap = 'round'
context.strokeStyle = 'black'

let b = 1
let maxAngle = 0
animate(() => {
  clear(canvas, context)
  const { x, y } = getCenter()
  context.beginPath()
  context.moveTo(x, y)
  for (let angle = 0; angle <= maxAngle; angle += 0.1) {
    const radius = goldenRatio ** (b * angle * (2 / Math.PI))
    drawer.lineTo({ origin: getCenter(), radius, angle })
  }
  maxAngle += 0.1
  b -= 0.00135
})

/*
let a = 1.5
let b = 10
let maxAngle = 0
animate(() => {
    clear(canvas, context)
    const {x, y} = getCenter()
    context.beginPath()
    context.moveTo(x, y)
    for (let angle = 0; angle <= maxAngle; angle += 0.1) {
        const radius = a + b * angle
        lineTo(canvas, context, {radius, angle})
    }
    maxAngle += 0.1
    b /= 1.0001
})
*/

function clear(canvas, context) {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight)
}
