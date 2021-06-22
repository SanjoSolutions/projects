"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.createOpenForm = createOpenForm;

var _navigateToFormPage = require("./navigateToFormPage.js");

var _openPage = require("./openPage.js");

function createOpenForm({ navigateToForm }) {
  return async function openForm(getBrowser, flatOffer) {
    const page = await (0, _openPage.openPage)(getBrowser);
    await (0, _navigateToFormPage.navigateToFormPage)(page, flatOffer);
    const form = await navigateToForm(page);
    return {
      page,
      form,
    };
  };
}
//# sourceMappingURL=createOpenForm.js.map
