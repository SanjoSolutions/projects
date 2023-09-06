import { submitForm } from "./submitForm.js"

export async function submitFormAndVerifySuccess(
  { form, page },
  verifySuccess,
) {
  await submitForm({ form, page })
  await verifySuccess({ form, page })
}
