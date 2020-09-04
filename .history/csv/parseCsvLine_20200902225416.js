const quoteCharacters = new Set(['"', "'"])

/*
export function parseCsvLine(line) {
  const cells = []
  let cellStartIndex = undefined
  let cellWithQuotes = false
  let cellQuoteCharacter = undefined
  for (let index = 0; index < line.length; index++) {
    const character = line[index]
    if (typeof cellStartIndex === 'undefined') {
      if (quoteCharacters.has(character)) {
        cellWithQuotes = true
        cellQuoteCharacter = character
      }
    }
  }
  return cells
}
*/

const textData = '[\x20-\x21\x23-\x2B\x2D-\x7E]'
const escaped = `"((?:${textData}|,|\r|\n|"")*)"`
const nonEscaped = `((?:${textData})*)`
const field = `(?:${escaped}|${nonEscaped})`
// const record = `${field}(?:,(${field}))*`

export function parseCsvLine(line) {
  const regExp = new RegExp(field, 'g')
  let match
  while (match = regExp.exec(line)) {
    console.log(match[1], match[2])
  }
}
