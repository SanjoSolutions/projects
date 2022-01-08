'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.verifyRequiredFields = verifyRequiredFields

var _verifyRequiredFields = require('../../lib/verifyRequiredFields.js')

var _getRequiredFields = require('./getRequiredFields.js')

function verifyRequiredFields(contactData) {
  return (0, _verifyRequiredFields.verifyRequiredFields)((0, _getRequiredFields.getRequiredFields)(), contactData)
}
//# sourceMappingURL=verifyRequiredFields.js.map
