export function getStyle(names, element) {
  const style = {}
  for (const name of names) {
    style[name] = element.style[name]
  }
  return style
}
