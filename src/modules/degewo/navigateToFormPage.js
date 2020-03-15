export async function navigateToFormPage (page, flatOffer) {
  await page.goto(flatOffer.url)
}
