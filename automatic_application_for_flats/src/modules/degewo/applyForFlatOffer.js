import { closePage } from '../../lib/closePage.js'
import { createApplyForFlatOffer } from '../../lib/createApplyForFlatOffer.js'
import { saveScreenshotOfFlatOfferApplication } from '../../lib/saveScreenshotOfFlatOfferApplication.js'
import { submitForm } from '../../lib/submitForm.js'
import { fillForm } from './fillForm.js'
import { openForm } from './openForm.js'
import { verifyRequiredFields } from './verifyRequiredFields.js'

export const applyForFlatOffer = createApplyForFlatOffer({
  verifyRequiredFields,
  openForm,
  fillForm,
  submitForm,
  saveScreenshot: saveScreenshotOfFlatOfferApplication,
  closePage,
})
