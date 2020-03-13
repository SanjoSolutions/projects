module.exports = {
  fetch,
  fetchOnce
}

const { formatDate } = require('../lib/formatDate.js')
const { getMissingFields } = require('../lib/getMissingFields.js')

async function fetch (getBrowser, intervalBetweenProcessRuns, onFlatOffer, shouldStop) {
  const page = await (await getBrowser()).newPage()

  while (!shouldStop()) {
    await fetchOnce(getBrowser, page, onFlatOffer)
    await wait(intervalBetweenProcessRuns)
  }

  await page.close()
}

async function fetchOnce (getBrowser, page, onFlatOffer) {
  await page.goto('https://www.stadtundland.de/Mieten/010-Angebote-Bestand.php?form=stadtundland-expose-search-1.form&sp%3Acategories%5B3352%5D%5B%5D=-&sp%3Acategories%5B3352%5D%5B%5D=__last__&sp%3AroomsFrom%5B%5D=&sp%3AroomsTo%5B%5D=&sp%3ArentPriceFrom%5B%5D=&sp%3ArentPriceTo%5B%5D=&sp%3AareaFrom%5B%5D=&sp%3AareaTo%5B%5D=&sp%3Afeature%5B%5D=__last__&action=submit')
  let nextButton
  do {
    const flatOfferElements = await page.$$('.SP-SearchResult .SP-TeaserList__item')
    for (const flatOfferElement of flatOfferElements) {
      const flatOffer = await parseFlatOffer(getBrowser, flatOfferElement)
      onFlatOffer(flatOffer)
    }
    // if pagination available unknown (not visible with 4 results)
  } while (nextButton)
}

async function parseFlatOffer (getBrowser, flatOfferElement) {
  const linkElement = await flatOfferElement.$('.SP-Link--info')
  const url = await linkElement.evaluate(node => node.href)

  const dataRows = await flatOfferElement.$$('.SP-Table--expose tbody tr')
  const data = await Promise.all(dataRows.map(async dataRow => {
    const keyElement = await dataRow.$('th')
    const key = await keyElement.evaluate(node => node.innerHTML)
    const valueElement = await dataRow.$('td')
    const value = await valueElement.evaluate(node => node.innerText)
    return [key, value]
  }))

  function getDataEntry (keyToFind) {
    return data.find(([key]) => key === keyToFind)
  }

  const coldRentText = getDataEntry('Kaltmiete:')[1]
  const coldRent = parseFloat(coldRentText.replace(',', '.'))

  const coldServiceChargesText = getDataEntry('Nebenkosten:')[1]
  const coldServiceCharges = parseFloat(coldServiceChargesText.replace(',', '.'))

  const warmServiceChargesText = getDataEntry('Heizkosten:')[1]
  const warmServiceCharges = parseFloat(warmServiceChargesText.replace(',', '.'))

  const warmRentText = getDataEntry('Warmmiete:')[1]
  const warmRent = parseFloat(warmRentText.replace(',', '.'))

  const areaText = getDataEntry('Wohnfläche:')
  const area = parseFloat(areaText[1].replace(',', '.'))

  const numberOfRoomsText = getDataEntry('Zimmer:')
  const numberOfRooms = parseFloat(numberOfRoomsText[1])

  const titleElement = (await flatOfferElement.$('.SP-Teaser__headline'))
  const title = await titleElement.evaluate(node => node.innerText)
  const seniorsOnly = title.includes('Senioren')

  const flatOffer = {
    url,
    coldRent,
    coldServiceCharges,
    warmServiceCharges,
    warmRent,
    area,
    numberOfRooms,
    seniorsOnly,
    async apply (getBrowser, contactData) {
      return await applyForFlatOffer(getBrowser, flatOffer, contactData)
    }
  }

  return flatOffer
}

async function applyForFlatOffer (getBrowser, flatOffer, contactData) {
  const requiredFields = [
    'title',
    'firstName',
    'lastName',
    'phone',
    'email',
    'wbs'
  ]
  const missingFields = getMissingFields(requiredFields, contactData)
  if (missingFields.length >= 1) {
    throw new Error(`Missing required fields in contactData: ${missingFields.join(', ')}`)
  }

  const page = await (await getBrowser()).newPage()
  await page.goto(flatOffer.url)

  const form = await page.$('#stadtundland-prospectForm')

  const title = contactData.title === 'Mrs.' ? 'mrs' : 'mr'
  await (await form.$('input[name="title[]"]')).select(title)

  await (await form.$('input[name="name[]"]')).type(contactData.lastName)
  await (await form.$('input[name="firstname[]"]')).type(contactData.firstName)

  if (contactData.address.street) {
    let streetAndNumber = contactData.address.street
    if (contactData.address.number) {
      streetAndNumber += ' ' + contactData.address.number
    }
    await (await form.$('input[name="street[]"]')).type(streetAndNumber)
  }

  if (contactData.address.postalCode) {
    await (await form.$('input[name="zip[]"]')).type(contactData.address.postalCode)
  }

  if (contactData.address.city) {
    await (await form.$('input[name="city[]"]')).type(contactData.address.city)
  }

  await (await form.$('input[name="phone[]"]')).type(contactData.phone)
  await (await form.$('input[name="email[]"]')).type(contactData.email)

  const wbsOptions = await form.$$('input[name="subsidized_housing[]"]')
  if (contactData.wbs) {
    await wbsOptions[0].evaluate(node => node.click())
  } else {
    await wbsOptions[1].evaluate(node => node.click())
  }

  await (await form.$('input[name="privacyProtectionAccepted[]"]')).click()

  // Submit
  await form.evaluate(form => form.submit())

  await page.close()
}

async function wait (howLongInMs) {
  return new Promise(resolve => setTimeout(resolve, howLongInMs))
}
