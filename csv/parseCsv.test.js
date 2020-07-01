import { removeQuotes } from '../removeQuotes.js'

function splitRow(row) {
  return row.split(',')
}

function parseRow(row) {
  return splitRow(row).map(removeQuotes)
}

function rowToObject(cellLabels, row) {
  return Object.fromEntries(
    row.map((cell, index) => [cellLabels[index], cell])
  )
}

function parseCsv (text) {
  const rows = text.split(/\r\n|\r|\n/g).map(parseRow)
  const cellLabels = rows[0]
  const bodyRows = rows.slice(1)
  return bodyRows.map(rowToObject.bind(null, cellLabels))
}

describe('parseCsv', () => {
  test('parses csv to JavaScript object', () => {
    const csv = '"a","b","c"\n' +
      '"1","2","3"'
    const result = parseCsv(csv)
    const expectedResult = [
      {a: '1', b: '2', c: '3'}
    ]
    expect(result).toEqual(expectedResult)
  })
})
