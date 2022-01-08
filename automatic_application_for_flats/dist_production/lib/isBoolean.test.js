'use strict'

var _isBoolean = require('./isBoolean.js')

describe('isBoolean', () => {
  it('returns true when value is a boolean', () => {
    expect((0, _isBoolean.isBoolean)(false)).toBe(true)
  })
  it('returns false when value is a number', () => {
    expect((0, _isBoolean.isBoolean)(1)).toBe(false)
  })
  it('returns false when value is null', () => {
    expect((0, _isBoolean.isBoolean)(null)).toBe(false)
  })
  it('returns false when value is undefined', () => {
    expect((0, _isBoolean.isBoolean)(undefined)).toBe(false)
  })
  it('returns false when value is an object', () => {
    expect((0, _isBoolean.isBoolean)({})).toBe(false)
  })
  it('returns false when value is a string', () => {
    expect((0, _isBoolean.isBoolean)('')).toBe(false)
  })
})
//# sourceMappingURL=isBoolean.test.js.map
