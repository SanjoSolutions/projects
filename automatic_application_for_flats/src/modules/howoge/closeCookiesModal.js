export async function closeCookiesModal(page) {
  const cookiesModalClose = await page.$('#cmpbntyestxt')
  if (cookiesModalClose) {
    await cookiesModalClose.click()
    await page.waitForTimeout(1000)
  }
}
