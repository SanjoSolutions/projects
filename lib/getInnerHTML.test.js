import { createBrowser } from './createBrowser.js'
import { createPageWithHTML } from './createPageWithHTML.js'
import { getInnerHTML } from './getInnerHTML.js'

let browser

beforeAll(async () => {
  browser = await createBrowser()
})

afterAll(async () => {
  await browser.close()
})

describe('getInnerHTML', () => {
  it('returns the innerHTML of the element', async () => {
    const expectedInnerHTML = '<p>test</p>'
    const page = await createPageWithHTML(browser, `<div>${expectedInnerHTML}</div>`)

    const element = await page.$('div')
    const innerHTML = await getInnerHTML(element)

    expect(innerHTML).toEqual(expectedInnerHTML)
  })
})

