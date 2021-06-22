"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.getInnerTextOfChildAsCurrency = getInnerTextOfChildAsCurrency;

var _parseCurrencyText = require("./parseCurrencyText.js");

var _getInnerTextOfChild = require("./getInnerTextOfChild.js");

async function getInnerTextOfChildAsCurrency(pageOrElement, selector) {
  return (0, _parseCurrencyText.parseCurrencyText)(
    await (0, _getInnerTextOfChild.getInnerTextOfChild)(pageOrElement, selector)
  );
}
//# sourceMappingURL=getInnerTextOfChildAsCurrency.js.map
