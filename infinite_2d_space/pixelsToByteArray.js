export function pixelsToByteArray(viewport, pixels) {
  const width = Math.abs(viewport.maxX - viewport.minX)
  const height = Math.abs(viewport.maxY - viewport.minY)
  const a = new Array(Math.ceil((width * height) / 8))
  for (const { x, y } of pixels) {
    const index = (y - viewport.minY) * width + (x - viewport.minX)
    a[Math.floor(index / 8)] |= 1 << index % 8
  }
  return a
}
