import { getSuit } from './getSuit.js'

describe('getSuit', () => {
  it('returns the suit "h" for card "4h', () => {
    expect(getSuit('4h')).toEqual('h')
  })

  it('returns the suit "s" for card "4s', () => {
    expect(getSuit('4s')).toEqual('s')
  })
})
