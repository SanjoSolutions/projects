import { waitForNavigation } from '../../lib/puppeteer/waitForNavigation.js'

export async function navigateToNextPage(page) {
  const nextButton = await page.$('a[rel="next"]')
  if (nextButton) {
    await Promise.all([waitForNavigation(page), nextButton.evaluate(button => button.click())])
  }
  return Boolean(nextButton)
}
