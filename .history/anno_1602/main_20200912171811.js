const canvas = document.createElement('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
document.body.appendChild(canvas)

const context = canvas.getContext('2d')
context.fillStyle = 'green'
context.fillRect(0, 0, canvas.width, canvas.height)

const selection = document.createElement('div')
selection.classList.add('selection')
document.body.appendChild(selection)

const selectionWidth = 96
const selectionHeight = 96

let isPointerDown = false

window.addEventListener('pointerdown', (event) => {
  isPointerDown = true
})

window.addEventListener('pointerup', (event) => {
  isPointerDown = false
})

window.addEventListener('pointermove', (event) => {
  const x = Math.floor(event.pageX / selectionWidth) * selectionWidth
  const y = Math.floor(event.pageY / selectionHeight) * selectionHeight
  selection.style.left = `${x}px`
  selection.style.top = `${y}px`
  if (isPointerDown) {
    drawRect(x, y)
  }
})

window.addEventListener('click', (event) => {
  const x = Math.floor(event.pageX / selectionWidth) * selectionWidth
  const y = Math.floor(event.pageY / selectionHeight) * selectionHeight
  drawRect(x, y)
})

function drawRect(x, y) {
  context.fillStyle = 'white'
  context.fillRect(x, y, selectionWidth, selectionHeight)
}
