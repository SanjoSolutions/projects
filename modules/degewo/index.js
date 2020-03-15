import { closePage } from '../../lib/closePage.js'
import { createApplyForFlatOffer } from '../../lib/createApplyForFlatOffer.js'
import { createFetch } from '../../lib/createFetch.js'
import { createFetchOnce } from '../../lib/createFetchOnce.js'
import { createParseFlatOffer } from '../../lib/createParseFlatOffer.js'
import { getMissingFields } from '../../lib/getMissingFields.js'
import { saveScreenshot } from '../../lib/saveScreenshot.js'
import { submitForm } from '../../lib/submitForm.js'
import { DegewoFlatOfferDetailPage } from './DegewoFlatOfferDetailPage.js'
import { DegewoFlatOfferListElement } from './DegewoFlatOfferListElement.js'

export async function parseFlatOfferUrl (flatOfferElement) {
  const linkElement = await flatOfferElement.$('a')
  return await linkElement.evaluate(node => node.href)
}

function verifyRequiredFields (contactData) {
  const requiredFields = ['firstName', 'lastName', 'email']
  const missingFields = getMissingFields(requiredFields, contactData)
  if (missingFields.length >= 1) {
    throw new Error(`Missing required fields in contactData: ${missingFields.join(', ')}`)
  }
}

async function openPage (getBrowser) {
  return await (await getBrowser()).newPage()
}

async function navigateToFormPage (page, flatOffer) {
  await page.goto(flatOffer.url)
}

async function navigateToForm (page) {
  const contactButton = await page.$('a[href="#kontakt"]')
  await contactButton.click()

  const formSelector = '#new_inquiry'
  await page.waitFor(formSelector, { visible: true })
  return await page.$(formSelector)
}

async function openForm (getBrowser, flatOffer) {
  const page = await openPage(getBrowser)
  await navigateToFormPage(page, flatOffer)
  const form = await navigateToForm(page)
  return { page, form }
}

async function fillForm (contactData, form) {
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
}

export const applyForFlatOffer = createApplyForFlatOffer({
  verifyRequiredFields,
  openForm,
  fillForm,
  submitForm,
  saveScreenshot,
  closePage
})

export const parseFlatOffer = createParseFlatOffer({
  parseFlatOfferUrl,
  DegewoFlatOfferListElement,
  DegewoFlatOfferDetailPage,
  applyForFlatOffer
})

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
