import { getMissingFields } from '../../lib/getMissingFields.js'

export function verifyRequiredFields (contactData) {
  const requiredFields = ['firstName', 'lastName', 'email']
  const missingFields = getMissingFields(requiredFields, contactData)
  if (missingFields.length >= 1) {
    throw new Error(`Missing required fields in contactData: ${missingFields.join(', ')}`)
  }
}
