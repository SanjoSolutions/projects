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

const buildingMenu = document.createElement('div')
buildingMenu.classList.add('building-menu')
document.body.appendChild(buildingMenu)

const buildings = [
  {
    width: 96,
    height: 96,
    backgroundColor: 'white'
  },
  {
    width: 96,
    height: 96,
    backgroundColor: 'brown'
  }
]

for (const building of buildings) {
  const $building = document.createElement('div')
  $building.classList.add('building')
  $building.style.width = building.width
  $building.style.height = building.height
  $building.style.backgroundColor = building.backgroundColor
  buildingMenu.appendChild($building)
}

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
  const coordinates = calculateSelectionCoordinates(event)

  const { x, y } = coordinates
  selection.style.left = `${x}px`
  selection.style.top = `${y}px`

  if (isPointerDown) {
    drawRect(coordinates)
  }
})

window.addEventListener('click', (event) => {
  const coordinates = calculateSelectionCoordinates(event)
  drawRect(coordinates)
})

function calculateSelectionCoordinates(event) {
  return {
    x: Math.floor(event.pageX / selectionWidth) * selectionWidth,
    y: Math.floor(event.pageY / selectionHeight) * selectionHeight
  }
}

function drawRect({ x, y }) {
  context.fillStyle = 'white'
  context.fillRect(x, y, selectionWidth, selectionHeight)
}