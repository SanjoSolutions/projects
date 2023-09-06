import { StringValueNotFoundError } from "./StringValueNotFoundError.js"

/**
 * Returns key constant for a string value from look-up.
 * If the string value is not found in look-up, an StringValueNotFoundError error is thrown.
 * @param lookUp {Map<string, string>} Look-up
 * @param stringValue String value
 * @returns {string} Key constant
 * @throws StringValueNotFoundError
 */
export function getKeyConstantFromLookUp(lookUp, stringValue) {
  if (!lookUp.has(stringValue)) {
    throw new StringValueNotFoundError(
      `String value "${stringValue}" has not been found in look-up.`,
    )
  }
  return lookUp.get(stringValue)
}
