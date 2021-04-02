/**
 * Checks if line is a log line.
 * @param line {string} The line to check
 * @returns {boolean} True if it is a log line. False if it is not a log line.
 */
export function isLogLine(line) {
  return /^[ \t]*(?:\/\/[ \t]*)?Log/.test(line)
}
