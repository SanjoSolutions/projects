"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.DegewoFlatOfferListElement = void 0;

var _FlatOfferListElement = require("../../lib/FlatOfferListElement.js");

var _getInnerTextOfChild = require("../../lib/getInnerTextOfChild.js");

var _getInnerTextOfChildAsCurrency = require("../../lib/getInnerTextOfChildAsCurrency.js");

var _isTitleOfSeniorsOnlyFlat = require("../../lib/isTitleOfSeniorsOnlyFlat.js");

class DegewoFlatOfferListElement extends _FlatOfferListElement.FlatOfferListElement {
  async getUrl() {
    const linkElement = await this.element.$("a");
    return await linkElement.evaluate((node) => node.href);
  }

  async getColdRent() {
    return await (0,
    _getInnerTextOfChildAsCurrency.getInnerTextOfChildAsCurrency)(
      this.element,
      ".price"
    );
  }

  async getSeniorsOnly() {
    const title = await (0, _getInnerTextOfChild.getInnerTextOfChild)(
      this.element,
      ".article__title"
    );
    return (0, _isTitleOfSeniorsOnlyFlat.isTitleOfSeniorsOnlyFlat)(title);
  }

  async getRequiredMinimumAge() {
    const title = await (0, _getInnerTextOfChild.getInnerTextOfChild)(
      this.element,
      ".article__title"
    );
    const requiredMinimumAgeRegExp = /([1-9][0-9]*) oder älter/;
    const result = requiredMinimumAgeRegExp.exec(title);
    return result ? parseInt(result[1], 10) : null;
  }
}

exports.DegewoFlatOfferListElement = DegewoFlatOfferListElement;
//# sourceMappingURL=DegewoFlatOfferListElement.js.map
