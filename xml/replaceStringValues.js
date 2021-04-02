import { replaceStringValue } from "./replaceStringValue.js";
import { StringValueNotFoundError } from "../StringValueNotFoundError.js";
import { getLineNumber } from "../getLineNumber.js";

/**
 * Replaces all string values with its reference string.
 * Also collects errors for string values that have not been found in the look-up.
 * Both the text with substitutions and the errors are returned.
 * @param lookUp {Map<string, string>} String value to key constant look-up
 * @param xmlText {string} XML
 * @returns {{text: string, errors: Array}} Object with substituted text and errors.
 */
export function replaceStringValues(lookUp, xmlText) {
  const xmlKeys = [
    "android:text",
    "android:label",
    "android:key",
    "android:title",
    "android:summary",
    "android:hint",
    "android:contentDescription",
  ];
  const regExp = new RegExp(`((?:${xmlKeys.join("|")})\\s*=\\s*)"(.+?)"`, "gm");
  const errors = [];
  const text = xmlText.replace(
    regExp,
    replaceOccurrence.bind(null, lookUp, xmlText, errors)
  );

  return { text, errors };
}

function replaceOccurrence(
  lookUp,
  xmlText,
  errors,
  match,
  labelPlusEqualsAndWhitespace,
  stringValue,
  offset
) {
  try {
    return `${labelPlusEqualsAndWhitespace}"${replaceStringValue(
      lookUp,
      stringValue
    )}"`;
  } catch (error) {
    if (error instanceof StringValueNotFoundError) {
      const stringValueNotFoundError = {
        stringValue: stringValue,
        lineNumber: getLineNumber(xmlText, offset),
      };
      errors.push(stringValueNotFoundError);
      return match;
    } else {
      throw error;
    }
  }
}
