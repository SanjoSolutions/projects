'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.getInnerHTMLOfChild = getInnerHTMLOfChild

var _getInnerHTMLProperty = require('./getInnerHTMLProperty.js')

async function getInnerHTMLOfChild(pageOrElement, selector) {
  return await pageOrElement.$eval(selector, _getInnerHTMLProperty.getInnerHTMLProperty)
}
//# sourceMappingURL=getInnerHTMLOfChild.js.map
