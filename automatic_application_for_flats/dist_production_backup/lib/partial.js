'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.partial = partial

function partial(fn, ...partialArgs) {
  return (...args) => {
    return fn(...partialArgs, ...args)
  }
}
//# sourceMappingURL=partial.js.map
