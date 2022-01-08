'use strict'

var _createBrowser = require('./createBrowser.js')

var _createPageWithHTML = require('./createPageWithHTML.js')

var _getInnerHTML = require('./getInnerHTML.js')

let browser
beforeAll(async () => {
  browser = await (0, _createBrowser.createBrowser)()
})
afterAll(async () => {
  await browser.close()
})
describe('getInnerHTML', () => {
  it('returns the innerHTML of the element', async () => {
    const expectedInnerHTML = '<p>test</p>'
    const page = await (0, _createPageWithHTML.createPageWithHTML)(browser, `<div>${expectedInnerHTML}</div>`)
    const element = await page.$('div')
    const innerHTML = await (0, _getInnerHTML.getInnerHTML)(element)
    expect(innerHTML).toEqual(expectedInnerHTML)
  })
})
//# sourceMappingURL=getInnerHTML.test.js.map
