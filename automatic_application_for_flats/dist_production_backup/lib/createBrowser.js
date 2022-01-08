'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.createBrowser = createBrowser

var puppeteer__NAMESPACE__ = _interopRequireWildcard(require('puppeteer'))

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

const puppeteer = puppeteer__NAMESPACE__.default || puppeteer__NAMESPACE__

async function createBrowser(optionsOverwrites) {
  return await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width: 1024,
      height: 768,
    },
    ...optionsOverwrites,
  })
}
//# sourceMappingURL=createBrowser.js.map
