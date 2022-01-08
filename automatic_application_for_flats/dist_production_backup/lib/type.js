'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.type = type

async function type(form, selector, text) {
  const element = await form.$(selector)
  await element.type(text)
}
//# sourceMappingURL=type.js.map
