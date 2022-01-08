'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.parseFloatNumberText = parseFloatNumberText

function parseFloatNumberText(floatNumberText) {
  return parseFloat(floatNumberText.replace(/\./, '').replace(',', '.'))
}
//# sourceMappingURL=parseFloatNumberText.js.map
