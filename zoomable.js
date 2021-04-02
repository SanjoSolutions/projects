export function zoomable(onZoom) {
  let zoom = 1

  window.addEventListener("keydown", (event) => {
    const { ctrlKey, key } = event
    if (ctrlKey) {
      if (new Set(["+", "-", "0"]).has(key)) {
        if (key === "+") {
          zoom += 0.25
        } else if (key === "-") {
          zoom = Math.max(0.25, zoom - 0.25)
        } else if (key === "0") {
          zoom = 1
        }
        event.preventDefault()
        onZoom(zoom)
      }
    }
  })
}

export function calculateViewport(viewport, previousZoom, zoom) {
  const newWidth = viewport.width * (previousZoom / zoom)
  const newHeight = viewport.height * (previousZoom / zoom)
  return {
    x: viewport.x + 0.5 * (viewport.width - newWidth),
    y: viewport.y + 0.5 * (viewport.height - newHeight),
    width: newWidth,
    height: newHeight,
  }
}
