import { getMissingFields } from './getMissingFields.js'

export function verifyRequiredFields (requiredFields, contactData) {
  const missingFields = getMissingFields(requiredFields, contactData)
  if (missingFields.length >= 1) {
    throw new Error(`Missing required fields in contactData: ${missingFields.join(', ')}`)
  }
}
