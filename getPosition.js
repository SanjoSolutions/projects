export function getPosition(element) {
  const x = parseInt(element.style.left, 10)
  const y = parseInt(element.style.top, 10)
  return { x, y }
}
