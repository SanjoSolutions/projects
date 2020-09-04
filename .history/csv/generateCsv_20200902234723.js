/**
 * Converts an array of rows to a CSV string.
 * Comma is used as separator for the cells.
 * Each value is wrapped in quotation marks (").
 * New line is used as line separator.
 * @param data {any[][]} Array of rows. Each row is an array with all the cells.
 * @returns {string} CSV
 */
export function generateCsv(data) {
  return data.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')
}
