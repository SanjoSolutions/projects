"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.fillForm = fillForm;

var _partial = require("../../lib/partial.js");

var _type = require("../../lib/type.js");

var _getTourSelector = require("./getTourSelector.js");

var _getTourSteps = require("./getTourSteps.js");

async function fillForm({ page }, contactData) {
  const tour = await page.$((0, _getTourSelector.getTourSelector)());
  const steps = await (0, _getTourSteps.getTourSteps)(tour);
  await (await steps[0].$(".form-checkbox")).click();
  await (await steps[0].$(".button.primary")).click();
  await (await steps[1].$(".form-checkbox")).click();
  await (await steps[1].$(".button.primary")).click();
  await (await steps[2].$(".form-checkbox")).click();
  await (await steps[2].$(".button.primary")).click();
  const form = await page.$("#show-visit-form");
  const type = (0, _partial.partial)(_type.type, form);

  if (contactData.title) {
    const inputs = await form.$$(
      'input[name="tx_mbxrealestate_pi1[visitRequest][salutation]"]'
    );

    if (contactData.title === "Mr.") {
      await inputs[1].evaluate((node) => {
        node.click();
      });
    } else if (contactData.title === "Mrs.") {
      await inputs[0].evaluate((node) => {
        node.click();
      });
    }
  }

  await type(
    'input[name="tx_mbxrealestate_pi1[visitRequest][firstName]"]',
    contactData.firstName
  );
  await type(
    'input[name="tx_mbxrealestate_pi1[visitRequest][lastName]"]',
    contactData.lastName
  );
  await type(
    'input[name="tx_mbxrealestate_pi1[visitRequest][email]"]',
    contactData.email
  );
  await type(
    'input[name="tx_mbxrealestate_pi1[visitRequest][phone]"]',
    contactData.phone
  );
}
//# sourceMappingURL=fillForm.js.map
