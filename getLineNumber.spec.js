import { getLineNumber } from './getLineNumber.js'

describe('getLineNumber', () => {
  it('returns the line number for a given text and index', () => {
    const text =
      'Line 1\n' +
      'Line 2\r' +
      'Line 3\r\n' +
      'Line 4'
    const index = text.indexOf('Line 4')
    expect(getLineNumber(text, index)).toEqual(4)
  })
})
