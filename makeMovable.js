import { getPosition } from "./getPosition.js";
import { identity } from './packages/identity/src/identity.js'

export function makeMovable(
  element,
  {
    elementWithWhichTheElementCanBeMovedWith,
    onPointerDown,
    onPointerUp,
    isMoving
  } = {}
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
  const {x, y} = element.getBoundingClientRect()
  element.style.position = 'absolute'
  element.style.left = x + 'px'
  element.style.top = y + 'px'

  let isMousePressed = false
  elementWithWhichTheElementCanBeMovedWith.addEventListener(
    'pointerdown',
    function (event) {
      onPointerDown(event)
      isMousePressed = true
      event.preventDefault()
    }
  )

  window.addEventListener('pointermove', function (event) {
    if (isMousePressed && isMoving(event)) {
      let {x, y} = getPosition(element)
      x += event.movementX
      y += event.movementY

      element.style.position = 'absolute'
      element.style.left = x + 'px'
      element.style.top = y + 'px'
    }
  })
  window.addEventListener('pointerup', function (event) {
    onPointerUp(event)
    isMousePressed = false
  })

  return element
}
