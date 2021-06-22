import { verifyFormSubmissionSuccess } from "./verifyFormSubmissionSuccess.js";

export async function submitForm({ form, page }) {
  await (await form.$('button[type="submit"]')).click();
  await verifyFormSubmissionSuccess({ form, page });
}
