export async function hasClass(element, className) {
  return await element.evaluate(evaluateHasClass, className)
}

function evaluateHasClass(element, className) {
  return element.classList.contains(className)
}
