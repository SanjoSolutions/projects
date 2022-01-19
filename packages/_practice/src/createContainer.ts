import { afterEach } from '@jest/globals'
import { unmountComponentAtNode } from 'react-dom'

export function createContainer(): HTMLDivElement {
  const container = document.createElement('div')
  document.body.appendChild(container)

  return container
}
