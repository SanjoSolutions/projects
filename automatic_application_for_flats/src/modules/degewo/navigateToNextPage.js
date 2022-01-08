export async function navigateToNextPage(page) {
  const nextButton = await page.$('a[rel="next"]')
  if (nextButton) {
    await nextButton.click()
    await page.waitFor('.search__results--loading', { hidden: true })
  }
  return Boolean(nextButton)
}
