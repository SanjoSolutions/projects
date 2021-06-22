"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.getInnerHTML = getInnerHTML;

var _getInnerHTMLProperty = require("./getInnerHTMLProperty.js");

async function getInnerHTML(element) {
  return await element.evaluate(_getInnerHTMLProperty.getInnerHTMLProperty);
}
//# sourceMappingURL=getInnerHTML.js.map
