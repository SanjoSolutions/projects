import { unmountComponentAtNode } from 'react-dom'

export function createContainer(): HTMLDivElement {
  const container = document.createElement('div')
  document.body.appendChild(container)

  afterEach(function () {
    unmountComponentAtNode(container)
    container.remove()
  })

  return container
}
