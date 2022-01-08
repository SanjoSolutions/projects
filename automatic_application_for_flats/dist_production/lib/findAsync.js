'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.findAsync = findAsync

async function findAsync(iterable, matcher) {
  for (const value of iterable) {
    if (await matcher(value)) {
      return value
    }
  }

  return null
}
//# sourceMappingURL=findAsync.js.map
