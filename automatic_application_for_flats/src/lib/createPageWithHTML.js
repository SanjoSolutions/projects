export async function createPageWithHTML(browser, html) {
  const page = await browser.newPage();
  await page.evaluate((html) => {
    document.body.innerHTML = html;
  }, html);
  return page;
}
