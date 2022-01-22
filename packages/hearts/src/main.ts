export function main(): void {
  let top = 0
  const heart = document.createElement('div')
  heart.textContent = '❤'
  heart.classList.add('heart')
  document.body.appendChild(heart)

  function requestNextAnimationFrame(): void {
    requestAnimationFrame(animate)
  }

  function animate(): void {
    top += 0.125
    heart.style.top = `${top}px`
    requestNextAnimationFrame()
  }

  requestNextAnimationFrame()
}
