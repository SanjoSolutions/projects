export async function verifyFormSubmissionSuccess ({ form, page }) {
  await page.waitFor('.success-message', { visible: true })
}
