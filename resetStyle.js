export function resetStyle(names, element) {
  for (const name of names) {
    element.style[name] = null
  }
}
