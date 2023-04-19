import { identity } from "./packages/identity/src/identity.js";

export function makeMovable(
  element,
  {
    elementWithWhichTheElementCanBeMovedWith,
    onPointerDown,
    onPointerUp,
    isMoving,
  } = {}
) {
  if (!elementWithWhichTheElementCanBeMovedWith) {
    elementWithWhichTheElementCanBeMovedWith = element;
  }
  if (!onPointerDown) {
    onPointerDown = identity;
  }
  if (!onPointerUp) {
    onPointerUp = identity;
  }
  if (!isMoving) {
    isMoving = () => true;
  }
  element.style.position = "absolute";
  element.style.left = element.offsetLeft + "px";
  element.style.top = element.offsetTop + "px";

  let isMousePressed = false;
  let pointerClickOffsetToWindow = null;

  function onPointerDownHandler(event) {
    onPointerDown(event);
    isMousePressed = true;
    pointerClickOffsetToWindow = {
      x: event.clientX - element.offsetLeft,
      y: event.clientY - element.offsetTop,
    };
    event.preventDefault();
  }

  elementWithWhichTheElementCanBeMovedWith.addEventListener(
    "pointerdown",
    onPointerDownHandler
  );

  function onPointerMove(event) {
    if (isMousePressed && isMoving(event)) {
      const x = event.clientX - pointerClickOffsetToWindow.x;
      const y = event.clientY - pointerClickOffsetToWindow.y;

      element.style.position = "absolute";
      element.style.left = x + "px";
      element.style.top = y + "px";
    }
  }

  window.addEventListener("pointermove", onPointerMove);

  function onPointerUpHandler(event) {
    if (isMousePressed) {
      onPointerUp(event);
      isMousePressed = false;
      pointerClickOffsetToWindow = null;
    }
  }

  window.addEventListener("pointerup", onPointerUpHandler);

  function removeEventListeners() {
    elementWithWhichTheElementCanBeMovedWith.removeEventListener(
      "pointerdown",
      onPointerDownHandler
    );
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUpHandler);
  }

  return removeEventListeners;
}
