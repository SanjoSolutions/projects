"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.navigateToFormPage = navigateToFormPage;

async function navigateToFormPage(page, flatOffer) {
  await page.goto(flatOffer.url);
}
//# sourceMappingURL=navigateToFormPage.js.map
