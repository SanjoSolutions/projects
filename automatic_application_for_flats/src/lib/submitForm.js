export async function submitForm({ form, page }) {
  await form.evaluate((form) => {
    form.submit()
  })
}
