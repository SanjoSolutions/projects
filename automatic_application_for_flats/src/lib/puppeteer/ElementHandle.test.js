import { ElementHandle } from 'puppeteer/lib/JSHandle.js'

describe('ElementHandle', () => {
  it('has the method $eval', () => {
    expect(typeof ElementHandle.prototype.$eval).toEqual('function')
  })
})
