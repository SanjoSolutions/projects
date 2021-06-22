import { partial } from "../../lib/partial.js";
import { type as typeIntoInput } from "../../lib/type.js";
import { getTourSelector } from "./getTourSelector.js";
import { getTourSteps } from "./getTourSteps.js";

export async function fillForm({ page }, contactData) {
  const tour = await page.$(getTourSelector());
  const steps = await getTourSteps(tour);

  await (await steps[0].$(".form-checkbox")).click();
  await (await steps[0].$(".button.primary")).click();

  await (await steps[1].$(".form-checkbox")).click();
  await (await steps[1].$(".button.primary")).click();

  await (await steps[2].$(".form-checkbox")).click();
  await (await steps[2].$(".button.primary")).click();

  const form = await page.$("#tour-registration-form");
  const type = partial(typeIntoInput, form);

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
