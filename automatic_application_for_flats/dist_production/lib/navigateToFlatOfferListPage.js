"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.navigateToFlatOfferListPage = navigateToFlatOfferListPage;

var _closeCookiesModal = require("../modules/howoge/closeCookiesModal.js");

var _waitForNavigation = require("./puppeteer/waitForNavigation.js");

async function navigateToFlatOfferListPage(page, flatOffersUrl) {
  await Promise.all([
    (0, _waitForNavigation.waitForNavigation)(page),
    page.goto(flatOffersUrl),
  ]);
  await (0, _closeCookiesModal.closeCookiesModal)(page);
}
//# sourceMappingURL=navigateToFlatOfferListPage.js.map
