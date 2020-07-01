import { replaceStringValue } from './replaceStringValue.js'
import { StringValueNotFoundError } from '../StringValueNotFoundError.js'
import { getLineNumber } from '../getLineNumber.js'
import { getLine } from '../getLine.js'
import { isLogLine } from './isLogLine.js'

/**
 * Replaces all string values with its reference string.
 * Strings in lines that start with "Log" or a commented out "Log" are ignored.
 * Also collects errors for string values that have not been found in the look-up.
 * Both the text with substitutions and the errors are returned.
 * @param lookUp {Map<string, string>} String value to key constant look-up
 * @param javaText {string} Java code
 * @returns {{text: string, errors: Array}} Object with substituted text and errors.
 */
export function replaceStringValues (lookUp, javaText) {
  const regExp = /"(.+?)"/g
  const errors = []
  const text = javaText.replace(regExp, replaceOccurrence.bind(null, lookUp, javaText, errors))

  return {text, errors}
}

function replaceOccurrence (lookUp, javaText, errors, match, stringValue, offset) {
  if (isLogLine(getLine(javaText, offset))) {
    return match
  } else {
    try {
      return replaceStringValue(lookUp, stringValue)
    } catch (error) {
      if (error instanceof StringValueNotFoundError) {
        const stringValueNotFoundError = {
          stringValue: stringValue,
          lineNumber: getLineNumber(javaText, offset)
        }
        errors.push(stringValueNotFoundError)
        return match
      } else {
        throw error
      }
    }
  }
}
