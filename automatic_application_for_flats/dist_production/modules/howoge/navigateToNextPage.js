'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.navigateToNextPage = navigateToNextPage

var _isElementEnabled = require('../../lib/isElementEnabled.js')

var _waitForNavigation = require('../../lib/puppeteer/waitForNavigation.js')

async function navigateToNextPage(page) {
  const nextButton = await page.$('.pagination--page-next')

  if (await canNavigateToNextPage(nextButton)) {
    const nextButtonA = await nextButton.$('a')
    await Promise.all([(0, _waitForNavigation.waitForNavigation)(page), nextButtonA.click()])
    await page.waitFor(() => {
      const $loading = document.querySelector('.loading')
      return !$loading.classList.contains('is')
    })
    return true
  } else {
    return false
  }
}

async function canNavigateToNextPage(nextButton) {
  return nextButton && (await (0, _isElementEnabled.isElementEnabled)(nextButton))
}
//# sourceMappingURL=navigateToNextPage.js.map
