'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.verifyRequiredFields = verifyRequiredFields

var _getMissingFields = require('./getMissingFields.js')

function verifyRequiredFields(requiredFields, contactData) {
  const missingFields = (0, _getMissingFields.getMissingFields)(requiredFields, contactData)

  if (missingFields.length >= 1) {
    throw new Error(`Missing required fields in contactData: ${missingFields.join(', ')}`)
  }
}
//# sourceMappingURL=verifyRequiredFields.js.map
