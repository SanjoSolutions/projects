export function polarCoordinatesToCartesianCoordinates({ origin, radius, angle }) {
  const x = origin.x + radius * Math.cos(angle)
  const y = origin.y + radius * Math.sin(angle)
  return { x, y }
}
