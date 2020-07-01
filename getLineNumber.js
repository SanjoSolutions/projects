/**
 * Returns the line number for a given index (position) in a text.
 * @param text {string} The text the line number refers to.
 * @param index {number} The index of the position of the character the line number refers to.
 * @returns {number} The line number.
 */
export function getLineNumber (text, index) {
  return 1 + [...text.substring(0, index).matchAll(/\r\n|\n|\r/g)].length
}
