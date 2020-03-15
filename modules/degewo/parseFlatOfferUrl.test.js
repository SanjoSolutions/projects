import { createBrowser } from '../../lib/createBrowser.js'
import { createPageWithHTML } from '../../lib/createPageWithHTML.js'
import { parseFlatOfferUrl } from './index.js'

let browser

beforeAll(async () => {
  browser = await createBrowser()
})

afterAll(async () => {
  await browser.close()
})

describe('parseFlatOfferUrl', () => {
  it('returns the url of the flat offer', async () => {
    const page = await createPageWithHTML(
      browser,
      `<div class="flat-offer">
            <a href="https://www.example.com/">Link</a>
        </div>`
    )

    const flatOfferElement = await page.$('.flat-offer')
    const url = await parseFlatOfferUrl(flatOfferElement)

    expect(url).toEqual('https://www.example.com/')
  })
})
