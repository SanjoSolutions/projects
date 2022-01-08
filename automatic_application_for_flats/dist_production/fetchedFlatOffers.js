'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.hasFetchedFlatOffer = hasFetchedFlatOffer
exports.registerFlatOfferAsFetched = registerFlatOfferAsFetched
exports.resetFetchedFlatOffers = resetFetchedFlatOffers

var _fs = require('fs')

var path__NAMESPACE__ = _interopRequireWildcard(require('path'))

var _readJSON = require('./lib/readJSON.js')

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
const fetchedFlatOffersFileName = 'fetchedFlatOffers.json'
const defaultFetchedFlatOffersFileName = 'fetchedFlatOffers.default.json'

async function readFetchedFlatOffers() {
  return await (0, _readJSON.readJSON)(path.resolve(__dirname, '..', fetchedFlatOffersFileName))
}

async function readDefaultFetchedFlatOffers() {
  return await (0, _readJSON.readJSON)(path.resolve(__dirname, '..', defaultFetchedFlatOffersFileName))
}

async function writeFetchedFlatOffers(fetchedFlatOffers) {
  await _fs.promises.writeFile(
    path.resolve(__dirname, '..', fetchedFlatOffersFileName),
    JSON.stringify(fetchedFlatOffers, null, 2),
    {
      encoding: 'utf8',
    }
  )
}

async function hasFetchedFlatOffer(url) {
  const fetchedFlatOffers = await readFetchedFlatOffers()
  return Boolean(fetchedFlatOffers[url])
}

async function registerFlatOfferAsFetched(url, flatOffer) {
  const fetchedFlatOffers = await readFetchedFlatOffers()
  fetchedFlatOffers[url] = flatOffer
  await writeFetchedFlatOffers(fetchedFlatOffers)
}

async function resetFetchedFlatOffers() {
  const defaultFetchedFlatOffers = await readDefaultFetchedFlatOffers()
  await writeFetchedFlatOffers(defaultFetchedFlatOffers)
}
//# sourceMappingURL=fetchedFlatOffers.js.map
