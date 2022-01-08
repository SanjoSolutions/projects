import { getLine } from './getLine.js'

describe('getLine', () => {
  it('returns the whole line of the text where the given index is in', () => {
    const text = 'Line 1\n' + 'Line 2\r' + 'Line 3\r\n' + 'Line 4'
    const index = text.indexOf('Line 4')
    expect(getLine(text, index)).toEqual('Line 4')
  })
})
