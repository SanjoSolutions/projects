import { calculateViewport, zoomable } from "@sanjo/zoomable"

const devicePixelRatio = window.devicePixelRatio
const canvas = document.getElementById("canvas") as HTMLCanvasElement
const documentWidth = window.innerWidth
const documentHeight = window.innerHeight
canvas.width = devicePixelRatio * documentWidth
canvas.height = devicePixelRatio * documentHeight

let viewport = {
  x: 0,
  y: 0,
  width: documentWidth,
  height: documentHeight,
}

let zoom = 1
const context = canvas.getContext("2d")!

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height)

  context.save()
  const scale = devicePixelRatio * zoom
  context.scale(scale, scale)
  context.translate(-viewport.x, -viewport.y)

  context.clearRect(0, 0, documentWidth, documentHeight)

  context.beginPath()
  const width = 100
  const height = 100
  const x = 0.5 * (documentWidth - width)
  const y = 0.5 * (documentHeight - height)
  context.rect(x, y, width, height)
  context.stroke()

  context.restore()
}

render()

function onZoom(_zoom: number): void {
  console.log("zoom", _zoom)
  const previousZoom = zoom
  zoom = _zoom
  viewport = calculateViewport(viewport, previousZoom, zoom)
  render()
}

zoomable(onZoom)
