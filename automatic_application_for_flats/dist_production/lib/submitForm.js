"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.submitForm = submitForm;

async function submitForm({ form, page }) {
  await form.evaluate((form) => {
    form.submit();
  });
}
//# sourceMappingURL=submitForm.js.map
