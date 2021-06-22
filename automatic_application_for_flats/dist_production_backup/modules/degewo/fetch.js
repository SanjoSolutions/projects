"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.fetch = void 0;

var _createFetch = require("../../lib/createFetch.js");

var _fetchOnce = require("./fetchOnce.js");

const fetch = (0, _createFetch.createFetch)({
  fetchOnce: _fetchOnce.fetchOnce,
});
exports.fetch = fetch;
//# sourceMappingURL=fetch.js.map
