'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.createDetailPage = createDetailPage

var _fs = require('fs')

var path__NAMESPACE__ = _interopRequireWildcard(require('path'))

var _createPageWithHTML = require('../../../lib/createPageWithHTML.js')

function _getRequireWildcardCache() {
  if (typeof WeakMap !== 'function') return null
  var cache = new WeakMap()
  _getRequireWildcardCache = function () {
    return cache
  }
  return cache
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj
  }
  if (obj === null || (typeof obj !== 'object' && typeof obj !== 'function')) {
    return { default: obj }
  }
  var cache = _getRequireWildcardCache()
  if (cache && cache.has(obj)) {
    return cache.get(obj)
  }
  var newObj = {}
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc)
      } else {
        newObj[key] = obj[key]
      }
    }
  }
  newObj.default = obj
  if (cache) {
    cache.set(obj, newObj)
  }
  return newObj
}

const path = path__NAMESPACE__.default || path__NAMESPACE__
let html

async function createDetailPage(browser) {
  if (!html) {
    html = await _fs.promises.readFile(path.resolve(__dirname, 'degewo_detail_page.html'))
  }

  return await (0, _createPageWithHTML.createPageWithHTML)(browser, html)
}
//# sourceMappingURL=createDetailPage.js.map
