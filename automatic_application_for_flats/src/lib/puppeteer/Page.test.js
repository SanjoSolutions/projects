import { Page } from 'puppeteer/lib/cjs/puppeteer/common/Page.js'

describe('Page', () => {
  it('has the method $eval', () => {
    expect(typeof Page.prototype.$eval).toEqual('function')
  })
})
