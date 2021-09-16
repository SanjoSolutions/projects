import { getPosition } from "./getPosition.js";

export function makeMovable(element, {elementWithWhichTheElementCanBeMovedWith} = {}) {
  if (!elementWithWhichTheElementCanBeMovedWith) {
    elementWithWhichTheElementCanBeMovedWith = element
  }
  const {x, y} = element.getBoundingClientRect()
  element.style.position = 'absolute'
  element.style.left = x + 'px'
  element.style.top = y + 'px'

  let isMousePressed = false
  elementWithWhichTheElementCanBeMovedWith.addEventListener(
    'pointerdown',
    function (event) {
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
  window.addEventListener('pointerup', function () {
    isMousePressed = false
  })

  return element
}
