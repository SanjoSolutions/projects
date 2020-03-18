import { hasFetchedFlatOffer, registerFlatOfferAsFetched } from '../../fetchedFlatOffers.js'
import { getMissingFields } from '../../lib/getMissingFields.js'
import { saveScreenshotOfFlatOfferApplication } from '../../lib/saveScreenshotOfFlatOfferApplication.js'
import { wait } from '../../lib/wait.js'

export async function fetch (getBrowser, intervalBetweenProcessRuns, onFlatOffer, shouldStop) {
  const page = await (await getBrowser()).newPage()

  while (!shouldStop()) {
    await fetchOnce(getBrowser, page, onFlatOffer)
    await wait(intervalBetweenProcessRuns)
  }

  await page.close()
}

export async function fetchOnce(getBrowser, page, onFlatOffer) {
  await page.goto('https://www.howoge.de/wohnungen-gewerbe/wohnungssuche.html')
  let nextButton
  do {
    const flatOfferElements = await page.$$('#immoobject-list .flat-single')
    for (const flatOfferElement of flatOfferElements) {
      const url = await parseFlatOfferUrl(flatOfferElement)
      if (!await hasFetchedFlatOffer(url)) {
        const flatOffer = await parseFlatOffer(getBrowser, flatOfferElement)
        onFlatOffer(flatOffer).then(async () => {
          await registerFlatOfferAsFetched(url)
        })
      }
    }
    // open question: scrolling down reveals more items? (not seen with 14 results)
  } while (nextButton)
}

async function parseFlatOfferUrl(flatOfferElement) {
  const linkElement = await flatOfferElement.$('a.flat-single--link')
  return await linkElement.evaluate(node => node.href)
}

async function parseFlatOffer (getBrowser, flatOfferElement) {
  const url = await parseFlatOfferUrl(flatOfferElement)

  const flatOfferPage = await (await getBrowser()).newPage()
  await flatOfferPage.goto(url)

  const costsDataRows = await flatOfferPage.$$('.expenses .wrap > div')
  const costsData = await Promise.all(costsDataRows.map(async costsDataRow => {
    const keyElement = await costsDataRow.$('p')
    const key = await keyElement.evaluate(node => node.innerHTML)
    const valueElement = await costsDataRow.$('div')
    const value = await valueElement.evaluate(node => node.innerText)
    return [key, value]
  }))

  function getCostsDataEntry(keyToFind) {
    return costsData.find(([key]) => key === keyToFind)
  }

  const coldRentText = getCostsDataEntry('Kaltmiete')[1]
  const coldRent = parseFloat(coldRentText.replace(',', '.'))

  const serviceChargesText = getCostsDataEntry('Nebenkosten')[1]
  const serviceCharges = parseFloat(serviceChargesText.replace(',', '.'))

  const warmRentText = getCostsDataEntry('Warmmiete')[1]
  const warmRent = parseFloat(warmRentText.replace(',', '.'))

  const keyFiguresRows = await flatOfferPage.$$('.expose-facts .details tr')
  const keyFigures = await Promise.all(keyFiguresRows.map(async keyFiguresRow => {
    const keyElement = await keyFiguresRow.$('th')
    const key = await keyElement.evaluate(node => node.innerHTML)
    const valueElement = await keyFiguresRow.$('td')
    const value = await valueElement.evaluate(node => node.innerText)
    return [key, value]
  }))

  function getKeyFigure(keyToFind) {
    return keyFigures.find(([key]) => key === keyToFind)
  }

  const areaX = getKeyFigure('Wohnfläche')
  const area = parseFloat(areaX[1].replace(',', '.'))

  const numberOfRoomsX = getKeyFigure('Zimmer')
  const numberOfRooms = parseInt(numberOfRoomsX[1], 10)

  const titleElement = (await flatOfferPage.$$('.expose-head .h1'))[1]
  const title = await titleElement.evaluate(node => node.innerText)
  const seniorsOnly = title.includes('Senioren')

  await flatOfferPage.close()

  const flatOffer = {
    url,
    coldRent,
    serviceCharges,
    warmRent,
    area,
    numberOfRooms,
    seniorsOnly,
    /*
    async apply (getBrowser, contactData) {
      return await applyForFlatOffer(getBrowser, flatOffer, contactData)
    }
    */
  }

  return flatOffer
}

async function applyForFlatOffer (getBrowser, flatOffer, contactData) {
  const requiredFields = ['firstName', 'lastName', 'email', 'phone']
  const missingFields = getMissingFields(requiredFields, contactData)
  if (missingFields.length >= 1) {
    throw new Error(`Missing required fields in contactData: ${missingFields.join(', ')}`)
  }

  const page = await (await getBrowser()).newPage()
  await page.goto(flatOffer.url)
  const contactButton = await page.$('.expose-contact .button')
  await contactButton.click()

  const tourSelector = '.tour-registration-process'
  await page.waitFor(tourSelector, { visible: true })
  const tour = await page.$(tourSelector)

  const steps = await tour.$$('.step-content')

  await (await steps[0].$('.form-checkbox')).click()
  await (await steps[0].$('.button.primary')).click()

  await (await steps[1].$('.form-checkbox')).click()
  await (await steps[1].$('.button.primary')).click()

  await (await steps[2].$('.form-checkbox')).click()
  await (await steps[2].$('.button.primary')).click()

  const form = await page.$('#tour-registration-form')

  if (contactData.title) {
    const inputs = await form.$$('input[name="tx_mbxrealestate_pi1[visitRequest][salutation]"]')

    if (contactData.title === 'Mr.') {
      await inputs[1].evaluate(node => {
        node.click()
      })
    } else if (contactData.title === 'Mrs.') {
      await inputs[0].evaluate(node => {
        node.click()
      })
    }
  }
  await (await form.$('input[name="tx_mbxrealestate_pi1[visitRequest][firstName]"]')).type(contactData.firstName)
  await (await form.$('input[name="tx_mbxrealestate_pi1[visitRequest][lastName]"]')).type(contactData.lastName)
  await (await form.$('input[name="tx_mbxrealestate_pi1[visitRequest][email]"]')).type(contactData.email)
  await (await form.$('input[name="tx_mbxrealestate_pi1[visitRequest][phone]"]')).type(contactData.phone)

  // Submit
  await (await steps[3].$('.button.primary')).click()

  await saveScreenshotOfFlatOfferApplication(page, flatOffer)

  await page.close()
}
