'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.fetchOnce = void 0

var _createFetchOnce = require('../../lib/createFetchOnce.js')

var _HowogeFlatOfferListPage = require('./HowogeFlatOfferListPage.js')

var _navigateToNextPage = require('./navigateToNextPage.js')

var _parseFlatOffer = require('./parseFlatOffer.js')

const fetchOnce = (0, _createFetchOnce.createFetchOnce)({
  flatOffersUrl: 'https://www.howoge.de/wohnungen-gewerbe/wohnungssuche.html',
  parseFlatOffer: _parseFlatOffer.parseFlatOffer,
  navigateToNextPage: _navigateToNextPage.navigateToNextPage,
  FlatOfferListPage: _HowogeFlatOfferListPage.HowogeFlatOfferListPage,
})
exports.fetchOnce = fetchOnce
//# sourceMappingURL=fetchOnce.js.map
