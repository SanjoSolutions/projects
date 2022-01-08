'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.getInnerText = getInnerText

var _getInnerTextProperty = require('./getInnerTextProperty.js')

async function getInnerText(element) {
  return await element.evaluate(_getInnerTextProperty.getInnerTextProperty)
}
//# sourceMappingURL=getInnerText.js.map
