import { closePage } from '../../lib/closePage.js'
import { createApplyForFlatOffer } from '../../lib/createApplyForFlatOffer.js'
import { createSubmitFormAndVerifySuccess } from '../../lib/createSubmitFormAndVerifySuccess.js'
import { saveScreenshotOfFlatOfferApplication } from '../../lib/saveScreenshotOfFlatOfferApplication.js'
import { fillForm } from './fillForm.js'
import { openForm } from './openForm.js'
import { verifyFormSubmissionSuccess } from './verifyFormSubmissionSuccess.js'
import { verifyRequiredFields } from './verifyRequiredFields.js'

export const applyForFlatOffer = createApplyForFlatOffer({
  verifyRequiredFields,
  openForm,
  fillForm,
  submitForm: createSubmitFormAndVerifySuccess(verifyFormSubmissionSuccess),
  saveScreenshot: saveScreenshotOfFlatOfferApplication,
  closePage
})
