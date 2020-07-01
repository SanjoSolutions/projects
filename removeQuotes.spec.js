import { removeQuotes } from './removeQuotes.js'

describe('removeQuotes', () => {
  it('removes quotes when present', () => {
    expect(removeQuotes('"test"')).toEqual('test')
  })

  it('does return string as given when quotes not present', () => {
    expect(removeQuotes('test')).toEqual('test')
  })
})
