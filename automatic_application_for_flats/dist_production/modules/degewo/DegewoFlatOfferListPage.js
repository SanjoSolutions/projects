'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.DegewoFlatOfferListPage = void 0

var _FlatOfferListPage = require('../../lib/FlatOfferListPage.js')

var _getFlatOfferElements = require('../../lib/getFlatOfferElements.js')

var _DegewoFlatOfferListElement = require('./DegewoFlatOfferListElement.js')

class DegewoFlatOfferListPage extends _FlatOfferListPage.FlatOfferListPage {
  async getFlatOfferElements() {
    const flatOfferElementsSelector = '.search__results article'
    return await (0, _getFlatOfferElements.getFlatOfferElements)(
      this.page,
      flatOfferElementsSelector,
      _DegewoFlatOfferListElement.DegewoFlatOfferListElement
    )
  }

  async getNumberOfResultsElement() {
    return await this.page.$('.form-tabs__container--active .search-immo-form__result-count')
  }
}

exports.DegewoFlatOfferListPage = DegewoFlatOfferListPage
//# sourceMappingURL=DegewoFlatOfferListPage.js.map
