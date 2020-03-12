module.exports = {
  fetch,
  fetchOnce
}

const { formatDate } = require('../lib/formatDate.js')
const { getMissingFields } = require('../lib/getMissingFields.js')

// https://www.howoge.de/wohnungen-gewerbe/wohnungssuche.html

async function fetch (browser, intervalBetweenProcessRuns, onFlatOffer, shouldStop) {
  const page = await browser.newPage()

  while (!shouldStop()) {
    await fetchOnce(browser, page, onFlatOffer)
    await wait(intervalBetweenProcessRuns)
  }

  await page.close()
}

async function fetchOnce (browser, page, onFlatOffer) {
  await page.goto('https://www.gewobag.de/fuer-mieter-und-mietinteressenten/mietangebote/?bezirke_all=&bezirke%5B%5D=charlottenburg-wilmersdorf&bezirke%5B%5D=charlottenburg-wilmersdorf-charlottenburg&bezirke%5B%5D=friedrichshain-kreuzberg&bezirke%5B%5D=friedrichshain-kreuzberg-friedrichshain&bezirke%5B%5D=lichtenberg&bezirke%5B%5D=lichtenberg-falkenberg&bezirke%5B%5D=marzahn-hellersdorf&bezirke%5B%5D=marzahn-hellersdorf-marzahn&bezirke%5B%5D=mitte&bezirke%5B%5D=mitte-moabit&bezirke%5B%5D=neukoelln&bezirke%5B%5D=neukoelln-buckow&bezirke%5B%5D=neukoelln-neukoelln&bezirke%5B%5D=neukoelln-rudow&bezirke%5B%5D=pankow&bezirke%5B%5D=pankow-prenzlauer-berg&bezirke%5B%5D=reinickendorf&bezirke%5B%5D=reinickendorf-reinickendorf&bezirke%5B%5D=reinickendorf-tegel&bezirke%5B%5D=reinickendorf-waidmannslust&bezirke%5B%5D=spandau&bezirke%5B%5D=spandau-haselhorst&bezirke%5B%5D=tempelhof-schoeneberg&bezirke%5B%5D=tempelhof-schoeneberg-schoeneberg&nutzungsarten%5B%5D=wohnung&gesamtmiete_von=&gesamtmiete_bis=&gesamtflaeche_von=&gesamtflaeche_bis=&zimmer_von=&zimmer_bis=')
  let nextButton
  do {
    const flatOfferElements = await page.$$('.filtered-mietangebote article')
    for (const flatOfferElement of flatOfferElements) {
      const flatOffer = await parseFlatOffer(browser, flatOfferElement)
      onFlatOffer(flatOffer)
    }
    // if pagination available unknown (not visible with 8 results)
  } while (nextButton)
}

async function parseFlatOffer (browser, flatOfferElement) {
  const linkElement = await flatOfferElement.$('a.angebot-header')
  const url = await linkElement.evaluate(node => node.href)

  const flatOfferPage = await browser.newPage()
  await flatOfferPage.goto(url)

  const costsDataRows = await flatOfferPage.$$('.details-price li')
  const costsData = await Promise.all(costsDataRows.map(async costsDataRow => {
    const keyElement = await costsDataRow.$('.detail-label')
    const key = await keyElement.evaluate(node => node.innerHTML)
    const valueElement = await costsDataRow.$('.detail-value')
    const value = await valueElement.evaluate(node => node.innerText)
    return [key, value]
  }))

  function getCostsDataEntry (keyToFind) {
    return costsData.find(([key]) => key === keyToFind)
  }

  const coldRentText = getCostsDataEntry('Grundmiete')[1]
  const coldRent = parseFloat(coldRentText.replace(',', '.'))

  const coldServiceChargesText = getCostsDataEntry('VZ Betriebskosten kalt')[1]
  const coldServiceCharges = parseFloat(coldServiceChargesText.replace(',', '.'))

  const warmServiceChargesEntry = getCostsDataEntry('VZ Betriebskosten warm')
  let warmServiceCharges
  if (warmServiceChargesEntry) {
    const warmServiceChargesText = warmServiceChargesEntry[1]
    warmServiceCharges = parseFloat(warmServiceChargesText.replace(',', '.'))
  } else {
    warmServiceCharges = null
  }

  const warmRentText = getCostsDataEntry('Gesamtmiete')[1]
  const warmRent = parseFloat(warmRentText.replace(',', '.'))

  const keyFiguresRows = await flatOfferPage.$$('.details-general li')
  const keyFigures = await Promise.all(keyFiguresRows.map(async keyFiguresRow => {
    const keyElement = await keyFiguresRow.$('.detail-label')
    const key = await keyElement.evaluate(node => node.innerHTML)
    const valueElement = await keyFiguresRow.$('.detail-value')
    const value = await valueElement.evaluate(node => node.innerText)
    return [key, value]
  }))

  function getKeyFigure (keyToFind) {
    return keyFigures.find(([key]) => key === keyToFind)
  }

  const areaX = getKeyFigure('Fläche in m²')
  const area = parseFloat(areaX[1].replace(',', '.'))

  const numberOfRoomsX = getKeyFigure('Anzahl Zimmer')
  const numberOfRooms = parseInt(numberOfRoomsX[1], 10)

  const titleElement = (await flatOfferPage.$('.entry-title'))
  const title = await titleElement.evaluate(node => node.innerText)
  const seniorsOnly = title.includes('Senioren')

  await flatOfferPage.close()

  const flatOffer = {
    url,
    coldRent,
    coldServiceCharges,
    warmServiceCharges,
    warmRent,
    area,
    numberOfRooms,
    seniorsOnly,
    async apply (browser, contactData) {
      return await applyForFlatOffer(browser, flatOffer, contactData)
    }
  }

  return flatOffer
}

async function applyForFlatOffer (browser, flatOffer, contactData) {
  const requiredFields = [
    'title',
    'firstName',
    'lastName',
    'email',
    'phone',
    'address',
    'applicationMessage',
    'numberOfAdults',
    'numberOfChildren',
    'personGroups',
    'monthlyIncome',
    'earliestDateToMoveIn',
    'wbs',
    'hasPets',
    'threatenedByLossOfHousing',
    'firstTimeHousehold',
    'mBill'
  ]
  const missingFields = getMissingFields(requiredFields, contactData)
  if (missingFields.length >= 1) {
    throw new Error(`Missing required fields in contactData: ${missingFields.join(', ')}`)
  }

  const page = await browser.newPage()
  await page.goto(flatOffer.url)

  const cookieBox = await page.$('#BorlabsCookieBox')
  if (await cookieBox.evaluate(node => node.children[0].style.display !== 'none')) {
    const acceptCookiesButton = (await cookieBox.$$('._brlbs-accept'))[1]
    await acceptCookiesButton.click()
    await page.waitFor(1000)
  }

  const contactButton = await page.$('button.rental-contact')
  await contactButton.click()

  const contactIframeSelector = '#contact-iframe'
  await page.waitFor(contactIframeSelector, { visible: true })
  const contactIframe = await page.$(contactIframeSelector)
  await page.goto(await contactIframe.evaluate(node => node.src))

  const form = await page.$('form')

  async function selectOption (selectSelector, optionsSelector, optionIndexToSelect, isMultiSelect = false) {
    const select = await form.$(selectSelector)
    await select.click()
    const options = await page.$(optionsSelector)
    await options.evaluate(
      (options, optionIndexToSelect) => {
        options.children[optionIndexToSelect].click()
      },
      optionIndexToSelect
    )
    if (isMultiSelect) {
      await select.click()
    }
  }

  await selectOption(
    'nz-select[formcontrolname="salutation"]',
    '#cdk-overlay-0 > div > div > ul',
    contactData.title === 'Mrs.' ? 0 : 1
  )

  await (await form.$('#firstName')).type(contactData.firstName)
  await (await form.$('#lastName')).type(contactData.lastName)
  await (await form.$('#email')).type(contactData.email)
  if (contactData.phone) {
    await (await form.$('#phone-number')).type(contactData.phone)
  }
  const address = contactData.address
  await (await form.$('#street')).type(address.street)
  await (await form.$('#house-number')).type(address.number)
  await (await form.$('#zip-code')).type(address.postalCode)
  await (await form.$('#city')).type(address.city)
  await (await form.$('#applicant-message')).type(contactData.applicationMessage)
  await (await form.$('#formly_2_input_grownUps_0')).type(String(contactData.numberOfAdults))
  await (await form.$('#formly_2_input_kids_1')).type(String(contactData.numberOfChildren))
  // IMPROVEMENT: Support all options (this just chooses "Sonstige")
  await selectOption(
    '#formly_3_select_employmentTypes_0',
    '#cdk-overlay-1 > div > div > ul',
    8,
    true
  )
  // IMPROVEMENT: Support all options (this just chooses "Sonstige")
  await selectOption(
    '#formly_3_select_income_1',
    '#cdk-overlay-2 > div > div > ul',
    1
  )
  await (await form.$('#formly_3_input_earliestMoveInDate_2')).type(formatDate(contactData.earliestDateToMoveIn))
  const wbsElement = await form.$('#formly_3_radio_wbs_2')
  if (contactData.wbs) {
    await wbsElement.evaluate(node => node.children[0].click())
    await (await form.$('#formly_4_input_\\$\\$_wbs_valid_until_\\$\\$_0')).type(formatDate(contactData.wbs.validUntil))
    await selectOption(
      '#formly_4_select_eligibleNumberOfRooms_1',
      '#cdk-overlay-3 > div > div > ul',
      contactData.wbs.numberOfRooms - 1
    )
  } else {
    await wbsElement.evaluate(node => node.children[1].click())
  }

  async function selectRadio (selector, optionIndex) {
    const radioGroup = await form.$(selector)
    await radioGroup.evaluate(
      (node, optionIndex) => node.children[optionIndex].click(),
      optionIndex
    )
  }

  await selectRadio('#formly_5_radio_pets_0', contactData.hasPets ? 0 : 1)
  await selectRadio('#formly_5_radio_flatLoss_7', contactData.threatenedByLossOfHousing ? 0 : 1)
  await selectRadio('#formly_5_radio_firstFlat_8', contactData.firstTimeHousehold ? 0 : 1)
  await selectRadio('#formly_5_radio_m-schein-available_9', contactData.mBill ? 0 : 1)

  await (await form.$('#formly_5_checkbox_dataPrivacy_11')).click()

  // Submit
  await form.evaluate(form => form.submit())

  await page.close()
}

async function wait (howLongInMs) {
  return new Promise(resolve => setTimeout(resolve, howLongInMs))
}
