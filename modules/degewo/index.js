import { DegewoFlatOfferListElement } from './DegewoFlatOfferListElement.js'
import { DegewoFlatOfferDetailPage } from './DegewoFlatOfferDetailPage.js'

import { getMissingFields } from '../../lib/getMissingFields.js'
import { saveScreenshot } from '../../lib/saveScreenshot.js'
import { createFetchOnce } from '../../lib/createFetchOnce.js'
import { createFetch } from '../../lib/createFetch.js'

export const fetchOnce = createFetchOnce({
  flatOffersUrl: 'https://immosuche.degewo.de/de/search?size=10&page=1&property_type_id=1&categories%5B%5D=1&lat=&lon=&area=&address%5Bstreet%5D=&address%5Bcity%5D=&address%5Bzipcode%5D=&address%5Bdistrict%5D=&address%5Braw%5D=&district=&property_number=&price_switch=false&price_radio=null&price_from=&price_to=&qm_radio=null&qm_from=&qm_to=&rooms_radio=null&rooms_from=&rooms_to=&wbs_required=&order=rent_total_without_vat_asc',
  flatOfferElementsSelector: '.search__results article',
  parseFlatOfferUrl,
  parseFlatOffer,
  async navigateToNextPage (page) {
    const nextButton = await page.$('a[rel="next"]')
    if (nextButton) {
      await nextButton.click()
      await page.waitFor('.search__results--loading', { hidden: true })
    }
    return Boolean(nextButton)
  }
})

export const fetch = createFetch(fetchOnce)

export async function parseFlatOfferUrl (flatOfferElement) {
  const linkElement = await flatOfferElement.$('a')
  return await linkElement.evaluate(node => node.href)
}

async function parseFlatOffer (getBrowser, flatOfferElement) {
  const url = await parseFlatOfferUrl(flatOfferElement)

  const flatOfferPage = await (await getBrowser()).newPage()
  await flatOfferPage.goto(url)

  const element = new DegewoFlatOfferListElement(flatOfferElement)
  const page = new DegewoFlatOfferDetailPage(flatOfferPage)

  const flatOffer = {
    url,
    coldRent: await element.getColdRent(),
    coldServiceCharges: await page.getColdServiceCharges(),
    warmServiceCharges: await page.getWarmServiceCharges(),
    area: await page.getArea(),
    numberOfRooms: await page.getNumberOfRooms(),
    seniorsOnly: await element.getSeniorsOnly() || await page.getSeniorsOnly(),
    requiredMinimumAge: await element.getRequiredMinimumAge(),
    async apply (getBrowser, contactData) {
      return await applyForFlatOffer(getBrowser, flatOffer, contactData)
    }
  }

  await flatOfferPage.close()

  return flatOffer
}

async function applyForFlatOffer (getBrowser, flatOffer, contactData) {
  const requiredFields = ['firstName', 'lastName', 'email']
  const missingFields = getMissingFields(requiredFields, contactData)
  if (missingFields.length >= 1) {
    throw new Error(`Missing required fields in contactData: ${missingFields.join(', ')}`)
  }

  const page = await (await getBrowser()).newPage()
  await page.goto(flatOffer.url)
  const contactButton = await page.$('a[href="#kontakt"]')
  await contactButton.click()

  const formSelector = '#new_inquiry'
  await page.waitFor(formSelector, { visible: true })
  const form = await page.$(formSelector)

  if (contactData.title) {
    if (contactData.title === 'Mr.') {
      await (await form.$('#inquiry_herr')).evaluate(node => {
        node.click()
      })
    } else if (contactData.title === 'Mrs.') {
      await (await form.$('#inquiry_frau')).evaluate(node => {
        node.click()
      })
    }
  }
  await (await form.$('#inquiry_prename')).type(contactData.firstName)
  await (await form.$('#inquiry_surname')).type(contactData.lastName)
  await (await form.$('#inquiry_email')).type(contactData.email)
  if (contactData.phone) {
    await (await form.$('#inquiry_telephone')).type(contactData.phone)
  }
  if (contactData.note) {
    await (await form.$('#inquiry_notes')).type(contactData.note)
  }

  if (process.env.NODE_ENV !== 'TESTING') {
    await form.evaluate(form => {
      form.submit()
    })

    await saveScreenshot(page, flatOffer)

    await page.close()
  }
}
