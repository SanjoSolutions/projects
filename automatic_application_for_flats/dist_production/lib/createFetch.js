"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.createFetch = createFetch;

var _wait = require("./wait.js");

function createFetch({ fetchOnce }) {
  return async function fetch(
    getBrowser,
    intervalBetweenProcessRuns,
    onFlatOffer,
    shouldStop
  ) {
    const page = await (await getBrowser()).newPage();

    while (!shouldStop()) {
      await fetchOnce(getBrowser, page, onFlatOffer);
      await (0, _wait.wait)(intervalBetweenProcessRuns);
    }

    await page.close();
  };
}
//# sourceMappingURL=createFetch.js.map
