const quoteCharacters = new Set(['"', "'"])

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
