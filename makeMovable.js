import { identity } from './packages/identity/src/identity.js'

export function makeMovable(
  element,
  { elementWithWhichTheElementCanBeMovedWith, onPointerDown, onPointerUp, isMoving } = {}
) {
  if (!elementWithWhichTheElementCanBeMovedWith) {
    elementWithWhichTheElementCanBeMovedWith = element
  }
  if (!onPointerDown) {
    onPointerDown = identity
  }
  if (!onPointerUp) {
    onPointerUp = identity
  }
  if (!isMoving) {
    isMoving = () => true
  }
  const { x, y } = element.getBoundingClientRect()
  element.style.position = 'absolute'
  element.style.left = x + 'px'
  element.style.top = y + 'px'

  let isMousePressed = false
  let pointerClickOffsetToWindow = null
  elementWithWhichTheElementCanBeMovedWith.addEventListener('pointerdown', function (event) {
    onPointerDown(event)
    isMousePressed = true
    pointerClickOffsetToWindow = {
      x: event.clientX - element.offsetLeft,
      y: event.clientY - element.offsetTop,
    }
    event.preventDefault()
  })

  window.addEventListener('pointermove', function (event) {
    if (isMousePressed && isMoving(event)) {
      const x = event.clientX - pointerClickOffsetToWindow.x
      const y = event.clientY - pointerClickOffsetToWindow.y

      element.style.position = 'absolute'
      element.style.left = x + 'px'
      element.style.top = y + 'px'
    }
  })
  window.addEventListener('pointerup', function (event) {
    if (isMousePressed) {
      onPointerUp(event)
      isMousePressed = false
      pointerClickOffsetToWindow = null
    }
  })

  return element
}
