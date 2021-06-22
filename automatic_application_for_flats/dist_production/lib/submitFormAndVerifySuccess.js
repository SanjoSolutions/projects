"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.submitFormAndVerifySuccess = submitFormAndVerifySuccess;

var _submitForm = require("./submitForm.js");

async function submitFormAndVerifySuccess({ form, page }, verifySuccess) {
  await (0, _submitForm.submitForm)({
    form,
    page,
  });
  await verifySuccess({
    form,
    page,
  });
}
//# sourceMappingURL=submitFormAndVerifySuccess.js.map
