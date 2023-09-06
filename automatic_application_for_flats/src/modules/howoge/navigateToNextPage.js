import { hasClass } from "../../lib/puppeteer/hasClass.js"
import { waitForNavigation } from "../../lib/puppeteer/waitForNavigation.js"

export async function navigateToNextPage(page) {
  const nextButtonListItem = await page.$(".pagination--page-next")
  const isDisabled = await hasClass(nextButtonListItem, "disabled")
  const isActive = !isDisabled
  if (isActive) {
    const nextButton = await nextButtonListItem.$("a")
    await nextButton.evaluate((button) => button.click())
  }
  return isActive
}
