import { createDOM } from './createDOM.js'

export function createTemplate(templateText) {
  const dom = createDOM(templateText)
  const template = dom.querySelector('template')
  return template
}
