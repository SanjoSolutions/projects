const textData = '[\x20-\x21\x23-\x2B\x2D-\x7E]'
const escaped = `"((?:${textData}|,|\r|\n|"")*)"`
const nonEscaped = `((?:${textData})*)`
const field = `(?:${escaped}|${nonEscaped})`
// const record = `${field}(?:,(${field}))*`

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
