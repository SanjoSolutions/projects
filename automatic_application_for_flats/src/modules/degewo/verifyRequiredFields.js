import { verifyRequiredFields as verifyRequiredFieldsBase } from '../../lib/verifyRequiredFields.js'
import { getRequiredFields } from './getRequiredFields.js'

export function verifyRequiredFields(contactData) {
  return verifyRequiredFieldsBase(getRequiredFields(), contactData)
}
