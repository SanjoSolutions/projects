import { submitFormAndVerifySuccess } from "./submitFormAndVerifySuccess.js"

export function createSubmitFormAndVerifySuccess(verifySuccess) {
  return ({ form, page }) =>
    submitFormAndVerifySuccess({ form, page }, verifySuccess)
}
