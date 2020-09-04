
// Standard: https://tools.ietf.org/html/rfc4180

const textData = '[\x20-\x21\x23-\x2B\x2D-\x7E]'
const escaped = `"((?:${textData}|,|\r|\n|"")*)"`
const nonEscaped = `((?:${textData})*)`
const field = `(?:${escaped}|${nonEscaped})`
const record = `(${field}(?:,(${field}))*)(?:\r\n|\n|\r)?`

/**
 * Parses CSV text to an array of rows. Each row is an array of cells.
 * Comma is used as separator for the cells.
 * Values can be wrapped inside quotations marks (") or have no wrapping.
 * Supported line separators are LF, CRLF and CR.
 * @param text {string} CSV text
 * @returns {any[][]} Parsed CSV as array of arrays.
 */
export function parseCsv(csv) {
  const rows = []
  const regExp = new RegExp(record, 'g')
  let match
  while (match = regExp.exec(csv)) {
    const row = match[1]
    rows.push(row)
    console.log(row, regExp.lastIndex)
  }
  return rows
}

export function parseCsvLine(line) {
  const cells = []
  const regExp = new RegExp(field, 'g')
  let match
  while (
    (regExp.lastIndex === 0 || line[regExp.lastIndex - 1] === ',') &&
    (match = regExp.exec(line))
  ) {
    const cell = match[1] ?? match[2]
    cells.push(cell)
    regExp.lastIndex++ // skip comma
  }
  return cells
}
