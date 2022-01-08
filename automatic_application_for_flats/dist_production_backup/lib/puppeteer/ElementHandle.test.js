'use strict'

var _JSHandle = require('puppeteer/lib/JSHandle.js')

describe('ElementHandle', () => {
  it('has the method $eval', () => {
    expect(typeof _JSHandle.ElementHandle.prototype.$eval).toEqual('function')
  })
})
//# sourceMappingURL=ElementHandle.test.js.map
