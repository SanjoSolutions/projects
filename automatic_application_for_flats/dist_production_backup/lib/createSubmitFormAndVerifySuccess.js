"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.createSubmitFormAndVerifySuccess = createSubmitFormAndVerifySuccess;

var _submitFormAndVerifySuccess = require("./submitFormAndVerifySuccess.js");

function createSubmitFormAndVerifySuccess(verifySuccess) {
  return ({ form, page }) =>
    (0, _submitFormAndVerifySuccess.submitFormAndVerifySuccess)(
      {
        form,
        page,
      },
      verifySuccess
    );
}
//# sourceMappingURL=createSubmitFormAndVerifySuccess.js.map
