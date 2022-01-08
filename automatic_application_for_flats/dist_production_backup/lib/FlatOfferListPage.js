'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.FlatOfferListPage = void 0

var _getInnerText = require('./getInnerText.js')

var _Page = require('./Page.js')

class FlatOfferListPage extends _Page.Page {
  async getFlatOfferElements() {
    return [] // instances of FlatOfferListElement
  }

  async getNumberOfResultsElement() {
    return null
  }

  async getNumberOfResultsText(numberOfResultsElement) {
    return await (0, _getInnerText.getInnerText)(numberOfResultsElement)
  }

  parseNumberOfResultsText(numberOfResultsText) {
    return parseInt(numberOfResultsText, 10)
  }

  async getNumberOfResults() {
    const element = await this.getNumberOfResultsElement()
    const numberOfResultsText = await this.getNumberOfResultsText(element)
    return element ? this.parseNumberOfResultsText(numberOfResultsText, 10) : 0
  }
}

exports.FlatOfferListPage = FlatOfferListPage
//# sourceMappingURL=FlatOfferListPage.js.map
