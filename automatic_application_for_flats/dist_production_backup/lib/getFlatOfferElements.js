"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.getFlatOfferElements = getFlatOfferElements;

var _FlatOfferListElement = require("./FlatOfferListElement.js");

async function getFlatOfferElements(
  page,
  flatOfferElementsSelector,
  FlatOfferListElement = FlatOfferListElement
) {
  return (await page.$$(flatOfferElementsSelector)).map(
    (element) => new FlatOfferListElement(element)
  );
}
//# sourceMappingURL=getFlatOfferElements.js.map
