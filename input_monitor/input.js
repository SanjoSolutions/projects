document.addEventListener('mousemove', (event) => {
  console.log(`Mouse move to (${event.pageX}, ${event.pageY})`)
})

document.addEventListener('mousedown', (event) => {
  console.log('Mouse down', event.button)
})

document.addEventListener('keypress', (event) => {
  console.log('Key press', event.key)
})
