import { lastMatch } from './lastMatch.js'

/**
 * Returns the full line, that the given index lies within, without leading or ending line break characters.
 * @param text {string} String that the index refers to
 * @param index {number} Index that lies within the line that should be returned
 * @returns {string} The line
 */
export function getLine (text, index) {
  let lineStartMatch = lastMatch(text, /\r\n|\n|\r/g, index - 1)
  let lineStartIndex
  if (lineStartMatch === null) {
    lineStartIndex = 0
  } else {
    lineStartIndex = lineStartMatch.index + lineStartMatch[0].length
  }
  let lineEndIndex = text.indexOf(/\r\n|\n|\r/g, index + 1)
  if (lineEndIndex === -1) {
    lineEndIndex = text.length
  }
  lineEndIndex -= 1
  return text.substring(lineStartIndex, lineEndIndex + 1)
}
