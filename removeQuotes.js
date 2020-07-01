/**
 * Removes quotes from a string when present.
 * Otherwise the string is returned as given.
 * @param string {string} String to remove quotes from.
 * @returns {string}
 */
export function removeQuotes (string) {
  if (string[0] === '"' && string[string.length - 1] === '"') {
    string = string.substring(1, string.length - 1)
  }
  return string
}
