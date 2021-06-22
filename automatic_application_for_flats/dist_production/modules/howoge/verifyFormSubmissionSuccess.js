"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.verifyFormSubmissionSuccess = verifyFormSubmissionSuccess;

async function verifyFormSubmissionSuccess({ form, page }) {
  await page.waitFor(".success-message", {
    visible: true,
  });
}
//# sourceMappingURL=verifyFormSubmissionSuccess.js.map
