describe('bind', () => {
  test('binding this', () => {
    function test() {
      return this
    }

    const customThis = 'a'
    expect(test.bind(customThis)()).toBe(customThis)
  })

  test('binding argument', () => {
    function test(a, b) {
      return {
        a, b
      }
    }

    const a = 'a'
    const b = 'b'
    expect(test.bind(null, a, b)()).toEqual({a, b})
  })
})
