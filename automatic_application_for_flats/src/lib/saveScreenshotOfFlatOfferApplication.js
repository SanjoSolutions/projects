import { getScreenshotFilePath } from './getScreenshotFilePath.js'
import { saveScreenshot } from './saveScreenshot.js'

export async function saveScreenshotOfFlatOfferApplication(page, flatOffer) {
  await saveScreenshot(page, getScreenshotFilePath(flatOffer))
}
