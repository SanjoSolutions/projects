const path = require('path')

module.exports = {
  async saveScreenshot(page, flatOffer) {
    await page.screenshot({
      path: path.resolve(
        __dirname,
        '..',
        'screenshots',
        path.basename(flatOffer.url, path.extname(flatOffer.url)) + '.png'
      )
    })
  }
}
