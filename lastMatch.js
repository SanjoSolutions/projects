/**
 * Returns the last match of a RegExp in a text.
 * Similar to RegExp.exec, except that it searches from right to left
 * instead of left to right.
 * @param text The text to search for an occurrence of the regular expression
 * @param regExp The regular expression to find in the text
 * @param fromIndex The index to start the search at from the right (right boundary)
 * @returns {*} A match object like RegExp.exec returns or null when no match has been found
 */
export function lastMatch (text, regExp, fromIndex = null) {
  if (fromIndex === null) {
    fromIndex = text.length - 1
  }
  let toIndex = fromIndex
  while (toIndex >= 0) {
    const match = regExp.exec(text.substring(toIndex, fromIndex + 1))
    if (match) {
      match.index = toIndex
      match.input = text
      return match
    }
    toIndex -= 1
  }
  return null
}
