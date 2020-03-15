import path from 'path'

export async function saveScreenshot(page, flatOffer) {
  await page.screenshot({
    path: path.resolve(
      __dirname,
      '..',
      'screenshots',
      path.basename(flatOffer.url, path.extname(flatOffer.url)) + '.png'
    )
  })
}
