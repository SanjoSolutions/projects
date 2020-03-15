import { createPageWithHTML } from '../createPageWithHTML.js'

export async function createFlatOfferElement(browser) {
  const page = await createPageWithHTML(browser, `
    <div class="flat-offer">
      <h1 class="flat-offer__title">Title</h1>
      <div class="flat-offer__cold-rent">
          <div class="flat-offer__cold-rent-label">Cold rent:</div>
          <div class="flat-offer__cold-rent-value">12,34 €</div>
      </div>
    </div>
  `)
  return await page.$('.flat-offer')
}
