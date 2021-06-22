import { acceptCookies } from "./acceptCookies.js";

export async function navigateToForm(page) {
  await acceptCookies(page);

  return await page.$("form.powermail_form");
}
