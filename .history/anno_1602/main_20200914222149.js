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

const built = []

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

let selectedBuilding = null
const selectionWidth = 96
const selectionHeight = 96

function updateSelectionStyle() {
  selection.style.width = `${selectedBuilding?.width || selectionWidth}px`
  selection.style.height = `${selectedBuilding?.height || selectionHeight}px`
  selection.style.backgroundColor = selectedBuilding?.backgroundColor || 'transparent'
}

updateSelectionStyle()

buildingMenu.addEventListener('click', (event) => {
  const $target = event.target
  const $buildings = Array.from(buildingMenu.querySelectorAll('.building'))
  const buildingIndex = $buildings.indexOf($target)
  if (buildingIndex !== -1) {
    selectBuilding(buildings[buildingIndex])
  }
})

function selectBuilding(building) {
  selectedBuilding = building
  updateSelectionStyle()
}

for (const building of buildings) {
  const $building = document.createElement('div')
  $building.classList.add('building')
  $building.style.width = building.width
  $building.style.height = building.height
  $building.style.backgroundColor = building.backgroundColor
  buildingMenu.appendChild($building)
}

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
    build(coordinates)
  }
})

window.addEventListener('click', (event) => {
  const coordinates = calculateSelectionCoordinates(event)
  build(coordinates)
})

window.addEventListener('keydown', (event) => {
  if (event.code === 'Escape') {
    selectedBuilding = null
    updateSelectionStyle()
  }
})

function calculateSelectionCoordinates(event) {
  return {
    x: Math.floor(event.pageX / selectionWidth) * selectionWidth,
    y: Math.floor(event.pageY / selectionHeight) * selectionHeight
  }
}

function build({ x, y }) {
  const building = { ...selectedBuilding }
  built.push({
    position: { x, y },
    building
  })
  debugger
  if (selectedBuilding) {
    drawBuilding(building, { x, y })
  }
}

function drawBuilding(building, { x, y }) {
  context.fillStyle = building.backgroundColor
  context.fillRect(x, y, building.width, building.height)
}
