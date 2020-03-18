import { submitFormAndVerifySuccess } from './submitFormAndVerifySuccess.js'

export async function createSubmitFormAndVerifySuccess (verifySuccess) {
  return ({ form, page }) => submitFormAndVerifySuccess({ form, page }, verifySuccess)
}
