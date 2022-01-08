'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.parseFlatOffer = void 0

var _createParseFlatOffer = require('../../lib/createParseFlatOffer.js')

var _applyForFlatOffer = require('./applyForFlatOffer.js')

var _HOWOGEFlatOfferDetailPage = require('./HOWOGEFlatOfferDetailPage.js')

const parseFlatOffer = (0, _createParseFlatOffer.createParseFlatOffer)({
  FlatOfferDetailPage: _HOWOGEFlatOfferDetailPage.HOWOGEFlatOfferDetailPage,
  applyForFlatOffer: _applyForFlatOffer.applyForFlatOffer,
})
exports.parseFlatOffer = parseFlatOffer
//# sourceMappingURL=parseFlatOffer.js.map
