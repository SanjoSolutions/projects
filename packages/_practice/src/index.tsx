import { renderOS } from './renderOS'

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('#root') as HTMLDivElement
  renderOS(container)
  setTimeout(() => {
    container.classList.add('rotate-out')
  }, 2000)
})
