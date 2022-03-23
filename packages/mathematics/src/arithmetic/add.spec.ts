import { describe, expect, it } from '@jest/globals'
import { add } from './add.js'

describe('add', () => {
  it('adds two numbers', () => {
    expect(add(1, 2)).toEqual(3)
  })
})
