'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.getInnerTextOfChild = getInnerTextOfChild

var _getInnerTextProperty = require('./getInnerTextProperty.js')

async function getInnerTextOfChild(pageOrElement, selector) {
  return await pageOrElement.$eval(selector, _getInnerTextProperty.getInnerTextProperty)
}
//# sourceMappingURL=getInnerTextOfChild.js.map
