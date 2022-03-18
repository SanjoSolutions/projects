import { ElementHandle } from 'puppeteer/lib/cjs/puppeteer/common/JSHandle.js'

describe('ElementHandle', () => {
  it('has the method $eval', () => {
    expect(typeof ElementHandle.prototype.$eval).toEqual('function')
  })
})
