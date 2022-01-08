'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.Page = void 0

var _getInnerHTMLOfChild = require('./getInnerHTMLOfChild.js')

var _getInnerTextOfChild = require('./getInnerTextOfChild.js')

class Page {
  constructor(page) {
    this.page = page
  }

  async getInnerText(selector) {
    return await (0, _getInnerTextOfChild.getInnerTextOfChild)(this.page, selector)
  }

  async getInnerHTML(selector) {
    return await (0, _getInnerHTMLOfChild.getInnerHTMLOfChild)(this.page, selector)
  }
}

exports.Page = Page
//# sourceMappingURL=Page.js.map
