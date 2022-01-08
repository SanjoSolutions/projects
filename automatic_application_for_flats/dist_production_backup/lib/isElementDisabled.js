'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.isElementDisabled = isElementDisabled

var _hasClass = require('./puppeteer/hasClass.js')

async function isElementDisabled(element) {
  return await (0, _hasClass.hasClass)(element, 'disabled')
}
//# sourceMappingURL=isElementDisabled.js.map
