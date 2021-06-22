import { closeCoronaModal } from "./closeCoronaModal.js";
import { getTourSelector } from "./getTourSelector.js";

export async function navigateToForm(page) {
  await closeCoronaModal(page);

  const contactButton = await page.$(".expose-contact .button");
  await contactButton.click();

  await page.waitFor(getTourSelector(), { visible: true });

  return null;
}
