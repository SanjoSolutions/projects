import { describe, it, expect } from '@jest/globals'
import { lastMatch } from './lastMatch.js'

describe('lastMatch', () => {
  it('returns the last match of the text occurrence that matches the regular expression', () => {
    const text = 'ababab'
    const match = lastMatch(text, /ab/g)
    expect(match[0]).toEqual('ab')
    expect(match.length).toEqual(1)
    expect(match.index).toEqual(4)
    expect(match.input).toEqual(text)
  })

  it('returns null when no occurence has been found', () => {
    const text = 'ababab'
    expect(lastMatch(text, /ac/g)).toEqual(null)
  })
})
