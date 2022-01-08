'use strict'

var _getInnerTextProperty = require('./getInnerTextProperty.js')

describe('getInnerTextProperty', () => {
  it('returns the innerText property', () => {
    const node = {
      innerText: 'test',
    }
    const innerText = (0, _getInnerTextProperty.getInnerTextProperty)(node)
    expect(innerText).toEqual('test')
  })
})
//# sourceMappingURL=getInnerTextProperty.test.js.map
