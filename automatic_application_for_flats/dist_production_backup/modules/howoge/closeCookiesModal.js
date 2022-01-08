'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.closeCookiesModal = closeCookiesModal

async function closeCookiesModal(page) {
  const cookiesModalClose = await page.$('#cmpbntyestxt')

  if (cookiesModalClose) {
    await cookiesModalClose.click()
    await page.waitFor(1000)
  }
}
//# sourceMappingURL=closeCookiesModal.js.map
