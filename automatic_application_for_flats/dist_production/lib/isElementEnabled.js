"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.isElementEnabled = isElementEnabled;

var _isElementDisabled = require("./isElementDisabled.js");

async function isElementEnabled(element) {
  return !(await (0, _isElementDisabled.isElementDisabled)(element));
}
//# sourceMappingURL=isElementEnabled.js.map
