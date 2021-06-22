"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.hasClass = hasClass;

async function hasClass(element, className) {
  return await element.evaluate(evaluateHasClass, className);
}

function evaluateHasClass(element, className) {
  return element.classList.contains(className);
}
//# sourceMappingURL=hasClass.js.map
