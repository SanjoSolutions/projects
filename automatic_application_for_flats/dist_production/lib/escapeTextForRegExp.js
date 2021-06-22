"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.escapeTextForRegExp = escapeTextForRegExp;

var _escapeCharacter = require("./escapeCharacter.js");

function escapeTextForRegExp(text) {
  return text.replace(/[()]/g, _escapeCharacter.escapeCharacter);
}
//# sourceMappingURL=escapeTextForRegExp.js.map
