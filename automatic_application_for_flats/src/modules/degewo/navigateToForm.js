export async function navigateToForm(page) {
  const contactButton = await page.$('a[href="#kontakt"]');
  await contactButton.click();

  const formSelector = "#new_inquiry";
  await page.waitFor(formSelector, { visible: true });
  return await page.$(formSelector);
}
