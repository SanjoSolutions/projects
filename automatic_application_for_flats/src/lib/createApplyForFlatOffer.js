export function createApplyForFlatOffer ({
  verifyRequiredFields,
  openForm,
  fillForm,
  submitForm,
  saveScreenshot,
  closePage
}) {
  return async function applyForFlatOffer (getBrowser, flatOffer, contactData) {
    verifyRequiredFields(contactData)

    const { page, form } = await openForm(getBrowser, flatOffer)

    await fillForm({ form, page }, contactData)

    if (process.env.NODE_ENV !== 'TESTING') {
      await submitForm({ form, page })
      await saveScreenshot(page, flatOffer)
      await closePage(page)
    }
  }
}
