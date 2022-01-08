'use strict'

var _createBrowser = require('./createBrowser.js')

var _getInnerTextOfChild = require('./getInnerTextOfChild.js')

var _createFlatOfferElement = require('./fixtures/createFlatOfferElement.js')

let browser
beforeAll(async () => {
  browser = await (0, _createBrowser.createBrowser)()
})
afterAll(async () => {
  await browser.close()
})
describe('getInnerTextOfChild', () => {
  it('returns the innerText of the child of the element that matches the selector', async () => {
    const element = await (0, _createFlatOfferElement.createFlatOfferElement)(browser)
    const innerText = await (0, _getInnerTextOfChild.getInnerTextOfChild)(element, '.flat-offer__title')
    expect(innerText).toEqual('Title')
  })
})
//# sourceMappingURL=getInnerTextOfChild.test.js.map
