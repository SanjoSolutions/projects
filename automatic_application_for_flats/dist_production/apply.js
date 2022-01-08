'use strict'

var path__NAMESPACE__ = _interopRequireWildcard(require('path'))

var puppeteer__NAMESPACE__ = _interopRequireWildcard(require('puppeteer'))

var _config = require('./config.js')

var _core = require('./core.js')

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
const puppeteer = puppeteer__NAMESPACE__.default || puppeteer__NAMESPACE__
run(main)

function getModuleName(url) {
  if (url.includes('immosuche')) {
    return 'degewo'
  } else if (url.includes('gesobau')) {
    return 'gesobau'
  } else if (url.includes('howoge')) {
    return 'howoge'
  } else if (url.includes('gewobag')) {
    return 'gewobag'
  } else if (url.includes('stadtundland')) {
    return 'stadt_und_land'
  } else if (url.includes('wbm')) {
    return 'wbm'
  } else {
    throw new Error(`Unknown module name for url "${url}".`)
  }
}

async function main() {
  const url = process.argv[2]
  const moduleName = getModuleName(url)
  const modulePathUnderTest = path.resolve(__dirname, 'modules', moduleName, 'applyForFlatOffer.js')
  const { applyForFlatOffer } = await Promise.resolve(`${modulePathUnderTest}`).then(s =>
    _interopRequireWildcard(require(s))
  )
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1024,
      height: 768,
    },
  })

  function getBrowser() {
    return browser
  }

  const flatOffer = {
    url,
  }
  await applyForFlatOffer(getBrowser, flatOffer, _config.contactData)
  await (0, _core.registerFlatOfferAsAppliedTo)(flatOffer)
}

function run(fn) {
  fn().then(console.log, console.error)
}
//# sourceMappingURL=apply.js.map
