'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.createPageWithHTML = createPageWithHTML

async function createPageWithHTML(browser, html) {
  const page = await browser.newPage()
  await page.evaluate(html => {
    document.body.innerHTML = html
  }, html)
  return page
}
//# sourceMappingURL=createPageWithHTML.js.map
