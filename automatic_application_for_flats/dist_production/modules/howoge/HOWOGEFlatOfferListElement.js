'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.HOWOGEFlatOfferListElement = void 0

var _FlatOfferListElement = require('../../lib/FlatOfferListElement.js')

class HOWOGEFlatOfferListElement extends _FlatOfferListElement.FlatOfferListElement {
  async getUrl() {
    const linkElement = await this.element.$('a.flat-single--link')
    return await linkElement.evaluate(node => node.href)
  }
}

exports.HOWOGEFlatOfferListElement = HOWOGEFlatOfferListElement
//# sourceMappingURL=HOWOGEFlatOfferListElement.js.map
