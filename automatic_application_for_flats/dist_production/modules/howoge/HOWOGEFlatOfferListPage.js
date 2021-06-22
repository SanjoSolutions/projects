"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.HowogeFlatOfferListPage = void 0;

var _FlatOfferListPage = require("../../lib/FlatOfferListPage.js");

var _getFlatOfferElements = require("../../lib/getFlatOfferElements.js");

var _HOWOGEFlatOfferListElement = require("./HOWOGEFlatOfferListElement.js");

class HowogeFlatOfferListPage extends _FlatOfferListPage.FlatOfferListPage {
  async getFlatOfferElements() {
    const flatOfferElementsSelector = "#immoobject-list .flat-single";
    return await (0, _getFlatOfferElements.getFlatOfferElements)(
      this.page,
      flatOfferElementsSelector,
      _HOWOGEFlatOfferListElement.HOWOGEFlatOfferListElement
    );
  }

  async getNumberOfResultsElement() {
    return await this.page.$(".immoobject-list--info-length");
  }
}

exports.HowogeFlatOfferListPage = HowogeFlatOfferListPage;
//# sourceMappingURL=HOWOGEFlatOfferListPage.js.map
