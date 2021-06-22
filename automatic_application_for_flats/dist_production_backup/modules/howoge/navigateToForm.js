"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.navigateToForm = navigateToForm;

var _closeCookiesModal = require("./closeCookiesModal.js");

var _closeCoronaModal = require("./closeCoronaModal.js");

var _getTourSelector = require("./getTourSelector.js");

async function navigateToForm(page) {
  await (0, _closeCookiesModal.closeCookiesModal)(page);
  await (0, _closeCoronaModal.closeCoronaModal)(page);
  const contactButton = await page.$(".expose-contact .button");
  await contactButton.click();
  await page.waitFor((0, _getTourSelector.getTourSelector)(), {
    visible: true,
  });
  return null;
}
//# sourceMappingURL=navigateToForm.js.map
