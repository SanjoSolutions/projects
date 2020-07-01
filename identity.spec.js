import { identity } from './identity.js'

describe('identity', () => {
  it('returns the value that has been passed', () => {
    expect(identity(1)).toEqual(1)
    expect(identity('a')).toEqual('a')
  })
})
