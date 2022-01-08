'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.closeCoronaModal = closeCoronaModal

async function closeCoronaModal(page) {
  const coronaModalClose = await page.$('#corona-modal .close')

  if (coronaModalClose) {
    await coronaModalClose.click()
    await page.waitFor(1000)
  }
}
//# sourceMappingURL=closeCoronaModal.js.map
