'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.clickRadioButtonBase = clickRadioButtonBase

async function clickRadioButtonBase(form, selector) {
  await clickChildElement(form, selector)
}

async function clickChildElement(parent, selector) {
  const element = await parent.$(selector)
  await element.evaluate(clickElement)
}

function clickElement(element) {
  element.click()
}
//# sourceMappingURL=clickRadioButtonBase.js.map
