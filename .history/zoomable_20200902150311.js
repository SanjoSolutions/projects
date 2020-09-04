export function zoomable(onZoom) {
  let zoom = 1

  window.addEventListener('keydown', (event) => {
    const { ctrlKey, key } = event
    if (ctrlKey) {
      if (new Set(['+', '-']).has(key)) {
        if (key === '+') {
          zoom += 0.25
        } else if (key === '-') {
          zoom = Math.max(0.25, zoom - 0.25)

        }
        event.preventDefault()
        onZoom(zoom)
      }
    }
  })
}
