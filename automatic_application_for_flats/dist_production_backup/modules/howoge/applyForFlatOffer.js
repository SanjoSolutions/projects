'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.applyForFlatOffer = void 0

var _closePage = require('../../lib/closePage.js')

var _createApplyForFlatOffer = require('../../lib/createApplyForFlatOffer.js')

var _saveScreenshotOfFlatOfferApplication = require('../../lib/saveScreenshotOfFlatOfferApplication.js')

var _fillForm = require('./fillForm.js')

var _openForm = require('./openForm.js')

var _submitForm = require('./submitForm.js')

var _verifyRequiredFields = require('./verifyRequiredFields.js')

const applyForFlatOffer = (0, _createApplyForFlatOffer.createApplyForFlatOffer)({
  verifyRequiredFields: _verifyRequiredFields.verifyRequiredFields,
  openForm: _openForm.openForm,
  fillForm: _fillForm.fillForm,
  submitForm: _submitForm.submitForm,
  // FIXME: Screenshot doesn't show success message
  saveScreenshot: _saveScreenshotOfFlatOfferApplication.saveScreenshotOfFlatOfferApplication,
  closePage: _closePage.closePage,
})
exports.applyForFlatOffer = applyForFlatOffer
//# sourceMappingURL=applyForFlatOffer.js.map
