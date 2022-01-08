import { isBoolean } from './isBoolean.js'

describe('isBoolean', () => {
  it('returns true when value is a boolean', () => {
    expect(isBoolean(false)).toBe(true)
  })

  it('returns false when value is a number', () => {
    expect(isBoolean(1)).toBe(false)
  })

  it('returns false when value is null', () => {
    expect(isBoolean(null)).toBe(false)
  })

  it('returns false when value is undefined', () => {
    expect(isBoolean(undefined)).toBe(false)
  })

  it('returns false when value is an object', () => {
    expect(isBoolean({})).toBe(false)
  })

  it('returns false when value is a string', () => {
    expect(isBoolean('')).toBe(false)
  })
})
