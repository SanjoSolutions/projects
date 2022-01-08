'use strict'

var _createBrowser = require('./createBrowser.js')

var _getInnerTextOfChildAsCurrency = require('./getInnerTextOfChildAsCurrency.js')

var _createFlatOfferElement = require('./fixtures/createFlatOfferElement.js')

let browser
beforeAll(async () => {
  browser = await (0, _createBrowser.createBrowser)()
})
afterAll(async () => {
  await browser.close()
})
describe('getInnerTextOfChildAsCurrency', () => {
  it('returns innerText of child of the element matching the selector as currency', async () => {
    const element = await (0, _createFlatOfferElement.createFlatOfferElement)(browser)
    const coldRent = await (0, _getInnerTextOfChildAsCurrency.getInnerTextOfChildAsCurrency)(
      element,
      '.flat-offer__cold-rent-value'
    )
    expect(coldRent).toEqual(12.34)
  })
})
//# sourceMappingURL=getInnerTextOfChildAsCurrency.test.js.map
