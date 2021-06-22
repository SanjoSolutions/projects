"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.createFlatOfferElement = createFlatOfferElement;

var _createPageWithHTML = require("../createPageWithHTML.js");

async function createFlatOfferElement(browser) {
  const page = await (0, _createPageWithHTML.createPageWithHTML)(
    browser,
    `
    <div class="flat-offer">
      <h1 class="flat-offer__title">Title</h1>
      <div class="flat-offer__cold-rent">
          <div class="flat-offer__cold-rent-label">Cold rent:</div>
          <div class="flat-offer__cold-rent-value">12,34 €</div>
      </div>
    </div>
  `
  );
  return await page.$(".flat-offer");
}
//# sourceMappingURL=createFlatOfferElement.js.map
