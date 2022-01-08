'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.saveScreenshot = saveScreenshot

async function saveScreenshot(page, filePath) {
  await page.screenshot({
    path: filePath,
  })
}
//# sourceMappingURL=saveScreenshot.js.map
