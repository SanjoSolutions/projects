describe('nullish coalescing operator', () => {
  test('', () => {
    const value = null
    const defaultValue = 'a'

    const result1 = value ?? defaultValue
    expect(result1).toEqual(defaultValue)

    const result2 = isNullish(value) ? defaultValue : value
    expect(result2).toEqual(defaultValue)
  })
})

function isNullish (value) {
  return value === null || value === undefined
}
