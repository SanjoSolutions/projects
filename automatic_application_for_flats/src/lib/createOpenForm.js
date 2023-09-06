import { navigateToFormPage } from "./navigateToFormPage.js"
import { openPage } from "./openPage.js"

export function createOpenForm({ navigateToForm }) {
  return async function openForm(getBrowser, flatOffer) {
    const page = await openPage(getBrowser)
    await navigateToFormPage(page, flatOffer)
    const form = await navigateToForm(page)
    return { page, form }
  }
}
