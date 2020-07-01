import { createLookUpFromCsv } from './createLookUpFromCsv.js'

describe('createLookUpFromCsv', () => {
  it('creates a look-up from string value to key constant', () => {
    const csv = [
      // String number, key constant, string value
      ['1', 'test', 'Test'],
      ['2', 'test2', 'Test 2']
    ]
    let expectedLookUp = new Map([
      ['Test', 'test'],
      ['Test 2', 'test2']]
    )
    expect(createLookUpFromCsv(csv)).toEqual(expectedLookUp)
  })

  it('does ignore rows with empty string value', () => {
    const csv = [
      // String number, key constant, string value
      ['1', 'test', '']
    ]
    expect(createLookUpFromCsv(csv)).toEqual(new Map([]))
  })
})
