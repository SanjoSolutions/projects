'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.wait = wait

async function wait(howLongInMs) {
  return new Promise(resolve => setTimeout(resolve, howLongInMs))
}
//# sourceMappingURL=wait.js.map
