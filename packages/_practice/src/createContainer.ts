export function createContainer(): HTMLDivElement {
  const container = document.createElement('div')
  document.body.appendChild(container)

  return container
}
