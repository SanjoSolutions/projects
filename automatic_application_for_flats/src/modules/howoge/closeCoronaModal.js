export async function closeCoronaModal(page) {
  const coronaModalClose = await page.$('#corona-modal .close')
  if (coronaModalClose) {
    await coronaModalClose.click()
    await page.waitForTimeout(1000)
  }
}
