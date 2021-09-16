export function setStyle(style, element) {
  for (const [name, value] of Object.entries(style)) {
    element.style[name] = value
  }
}
