"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.submitForm = submitForm;

var _getTourSelector = require("./getTourSelector.js");

var _getTourSteps = require("./getTourSteps.js");

async function submitForm({ form, page }) {
  const tour = await page.$((0, _getTourSelector.getTourSelector)());
  const steps = await (0, _getTourSteps.getTourSteps)(tour);
  await (await steps[3].$(".button.primary")).click();
  await page.waitFor(() => {
    const successStep = Array.from(
      document.querySelectorAll(".step-content")
    )[4]; // TODO: Needs confirmation that it works

    return successStep && successStep.classList.contains("show");
  });
}
//# sourceMappingURL=submitForm.js.map
