"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.FlatOfferListElement = void 0;

var _mixin = require("./mixin.js");

var _Element = require("./Element.js");

var _FlatOfferInformationRetriever = require("./FlatOfferInformationRetriever.js");

class FlatOfferListElement extends _Element.Element {
  getUrl() {
    return null;
  }
}

exports.FlatOfferListElement = FlatOfferListElement;
(0, _mixin.mixin)(
  FlatOfferListElement,
  _FlatOfferInformationRetriever.FlatOfferInformationRetriever
);
//# sourceMappingURL=FlatOfferListElement.js.map
