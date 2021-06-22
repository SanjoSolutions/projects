"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.readJSON = readJSON;

var _fs = require("fs");

async function readJSON(path) {
  return JSON.parse(
    await _fs.promises.readFile(path, {
      encoding: "utf8",
    })
  );
}
//# sourceMappingURL=readJSON.js.map
