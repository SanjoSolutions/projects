import path from 'path'
import { __dirname } from './__dirname.js'

export async function saveScreenshot (page, flatOffer) {
  await page.screenshot({
    path: path.resolve(
      __dirname(import.meta.url),
      '..',
      'screenshots',
      path.basename(flatOffer.url, path.extname(flatOffer.url)) + '.png'
    )
  })
}
