import { getKeyConstantFromLookUp } from "../getKeyConstantFromLookUp.js"

/**
 * Replaces a string value with the reference string (`R.string.<keyConstant>`) from the look-up.
 * If string has not been found in look-up, it throws an StringValueNotFoundError error.
 * @param lookUp {Map<string, string>} String value to key constant look-up
 * @param stringValue {string} String value
 * @returns {string} Reference string. E.g. R.string.example when key constant has the value "example".
 * @throws StringValueNotFoundError
 */
export function replaceStringValue(lookUp, stringValue) {
  const keyConstant = getKeyConstantFromLookUp(lookUp, stringValue)
  return `R.string.${keyConstant}`
}
