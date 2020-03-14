module.exports = {
  fetch,
  fetchOnce
}

const { formatDateForDateInput } = require('../lib/formatDateForDateInput.js')
const { getMissingFields } = require('../lib/getMissingFields.js')
const { saveScreenshot } = require('../lib/saveScreenshot.js')

async function fetch (getBrowser, intervalBetweenProcessRuns, onFlatOffer, shouldStop) {
  const page = await (await getBrowser()).newPage()

  while (!shouldStop()) {
    await fetchOnce(getBrowser, page, onFlatOffer)
    await wait(intervalBetweenProcessRuns)
  }

  await page.close()
}

async function fetchOnce (getBrowser, page, onFlatOffer) {
  await page.goto('https://www.wbm.de/wohnungen-berlin/angebote/')
  let nextButton
  do {
    const flatOfferElements = await page.$$('.search .openimmo-search-list-item')
    for (const flatOfferElement of flatOfferElements) {
      const flatOffer = await parseFlatOffer(getBrowser, flatOfferElement)
      onFlatOffer(flatOffer)
    }
    // TODO: Pagination
    // pagination available (next button not visible)
  } while (nextButton)
}

async function parseFlatOffer (getBrowser, flatOfferElement) {
  const linkElement = await flatOfferElement.$('a')
  const url = await linkElement.evaluate(node => node.href)

  const dataRows = await flatOfferElement.$$('ul.main-property-list li')
  const data = await Promise.all(dataRows.map(async dataRow => {
    const keyElement = await dataRow.$('div:nth-child(1)')
    const key = await keyElement.evaluate(node => node.innerHTML)
    const valueElement = await dataRow.$('div:nth-child(2)')
    const value = await valueElement.evaluate(node => node.innerText)
    return [key, value]
  }))

  function getDataEntry (keyToFind) {
    return data.find(([key]) => key === keyToFind)
  }

  const warmRentText = getDataEntry('Gesamtmiete:')[1]
  const warmRent = parseFloat(warmRentText.replace(',', '.'))

  const areaText = getDataEntry('Größe:')
  const area = parseFloat(areaText[1].replace(',', '.'))

  const numberOfRoomsText = getDataEntry('Zimmer:')
  const numberOfRooms = parseFloat(numberOfRoomsText[1])

  const titleElement = (await flatOfferElement.$('h2'))
  const title = await titleElement.evaluate(node => node.innerHTML)
  const seniorsOnly = title.includes('Senioren')

  const flatOffer = {
    url,
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
    'wbs',
    'firstName',
    'lastName',
    'email'
  ]
  const missingFields = getMissingFields(requiredFields, contactData)
  if (missingFields.length >= 1) {
    throw new Error(`Missing required fields in contactData: ${missingFields.join(', ')}`)
  }

  const page = await (await getBrowser()).newPage()
  await page.goto(flatOffer.url)

  const cookieSettingsSubmit = await page.$('.cookie-settings-submit')
  if (cookieSettingsSubmit) {
    await cookieSettingsSubmit.click()
  }

  const form = await page.$('form.powermail_form')

  const wbsOptions = await form.$$('input[name*="[wbsvorhanden]"]')
  if (contactData.wbs) {
    await wbsOptions[0].evaluate(node => node.click())
    ;(await form.$('input[name*="[wbsmitbesonderemwohnbedarf][]"]')).evaluate(
      (checkbox, specialHousingNeed) => {
        checkbox.checked = specialHousingNeed
      },
      Boolean(contactData.wbs.specialHousingNeed)
    )
    ;(await form.$('input[name*="[wbsgueltigbis]"]')).evaluate(
      (input, date) => {
        input.value = date
      },
      formatDateForDateInput(contactData.wbs.validUntil)
    )
    ;(await form.$('select[name*="[wbszimmeranzahl]"]')).evaluate(
      (select, numberOfRooms) => {
        select.value = numberOfRooms
      },
      contactData.wbs.numberOfRooms
    )
  } else {
    await wbsOptions[1].evaluate(node => node.click())
  }

  await (await form.$('input[name*="[name]"]')).type(contactData.lastName)
  await (await form.$('input[name*="[vorname]"]')).type(contactData.firstName)

  if (contactData.address.street) {
    let streetAndNumber = contactData.address.street
    if (contactData.address.number) {
      streetAndNumber += ' ' + contactData.address.number
    }
    await (await form.$('input[name*="[strasse]"]')).type(streetAndNumber)
  }

  if (contactData.address.postalCode) {
    await (await form.$('input[name*="[plz]"]')).type(contactData.address.postalCode)
  }

  if (contactData.address.city) {
    await (await form.$('input[name*="[ort]"]')).type(contactData.address.city)
  }

  await (await form.$('input[name*="[e_mail]"]')).type(contactData.email)
  await (await form.$('input[name*="[telefon]"]')).type(contactData.phone)

  ;(await form.$('input[name*="[datenschutzhinweis][]"]')).evaluate(
    (checkbox) => {
      checkbox.checked = true
    }
  )

  // Submit
  await form.evaluate(form => form.submit())

  await saveScreenshot(page, flatOffer)

  await page.close()
}

async function wait (howLongInMs) {
  return new Promise(resolve => setTimeout(resolve, howLongInMs))
}
