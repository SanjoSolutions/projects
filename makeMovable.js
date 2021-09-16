import { getPosition } from "./getPosition.js";
import { identity } from './packages/identity/src/identity.js'

export function makeMovable(
  element,
  {
    elementWithWhichTheElementCanBeMovedWith,
    onPointerDown,
    onPointerUp
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
  function isMoving(event) {
    return isMousePressed && !event.shiftKey
  }
  window.addEventListener('pointermove', function (event) {
    if (isMoving(event)) {
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
