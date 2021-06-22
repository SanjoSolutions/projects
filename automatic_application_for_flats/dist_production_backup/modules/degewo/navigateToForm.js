"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.navigateToForm = navigateToForm;

async function navigateToForm(page) {
  const contactButton = await page.$('a[href="#kontakt"]');
  await contactButton.click();
  const contactIframeSelector = "iframe";
  await page.waitFor(contactIframeSelector, {
    visible: true,
  });
  const contactIframe = await page.$(contactIframeSelector);
  await page.goto(await contactIframe.evaluate((node) => node.src));
  await page.waitFor("form");
  const form = await page.$("form");
  return form;
}
//# sourceMappingURL=navigateToForm.js.map
