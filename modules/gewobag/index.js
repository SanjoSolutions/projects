import { formatDate } from '../../lib/formatDate.js'
import { getMissingFields } from '../../lib/getMissingFields.js'
import { saveScreenshot } from '../../lib/saveScreenshot.js'
import { hasFetchedFlatOffer, registerFlatOfferAsFetched } from '../../fetchedFlatOffers.js'
import { wait } from '../../lib/wait.js'

export async function fetch (getBrowser, intervalBetweenProcessRuns, onFlatOffer, shouldStop) {
  const page = await (await getBrowser()).newPage()

  while (!shouldStop()) {
    await fetchOnce(getBrowser, page, onFlatOffer)
    await wait(intervalBetweenProcessRuns)
  }

  await page.close()
}

export async function fetchOnce (getBrowser, page, onFlatOffer) {
  await page.goto('https://www.gewobag.de/fuer-mieter-und-mietinteressenten/mietangebote/?bezirke_all=&bezirke%5B%5D=charlottenburg-wilmersdorf&bezirke%5B%5D=charlottenburg-wilmersdorf-charlottenburg&bezirke%5B%5D=friedrichshain-kreuzberg&bezirke%5B%5D=friedrichshain-kreuzberg-friedrichshain&bezirke%5B%5D=lichtenberg&bezirke%5B%5D=lichtenberg-falkenberg&bezirke%5B%5D=marzahn-hellersdorf&bezirke%5B%5D=marzahn-hellersdorf-marzahn&bezirke%5B%5D=mitte&bezirke%5B%5D=mitte-moabit&bezirke%5B%5D=neukoelln&bezirke%5B%5D=neukoelln-buckow&bezirke%5B%5D=neukoelln-neukoelln&bezirke%5B%5D=neukoelln-rudow&bezirke%5B%5D=pankow&bezirke%5B%5D=pankow-prenzlauer-berg&bezirke%5B%5D=reinickendorf&bezirke%5B%5D=reinickendorf-reinickendorf&bezirke%5B%5D=reinickendorf-tegel&bezirke%5B%5D=reinickendorf-waidmannslust&bezirke%5B%5D=spandau&bezirke%5B%5D=spandau-haselhorst&bezirke%5B%5D=tempelhof-schoeneberg&bezirke%5B%5D=tempelhof-schoeneberg-schoeneberg&nutzungsarten%5B%5D=wohnung&gesamtmiete_von=&gesamtmiete_bis=&gesamtflaeche_von=&gesamtflaeche_bis=&zimmer_von=&zimmer_bis=')
  let nextButton
  do {
    const flatOfferElements = await page.$$('.filtered-mietangebote article')
    for (const flatOfferElement of flatOfferElements) {
      const url = await parseFlatOfferUrl(flatOfferElement)
      if (!await hasFetchedFlatOffer(url)) {
        const flatOffer = await parseFlatOffer(getBrowser, flatOfferElement)
        onFlatOffer(flatOffer).then(async () => {
          await registerFlatOfferAsFetched(url)
        })
      }
    }
    // if pagination available unknown (not visible with 8 results)
  } while (nextButton)
}

async function parseFlatOfferUrl(flatOfferElement) {
  const linkElement = await flatOfferElement.$('a.angebot-header')
  return await linkElement.evaluate(node => node.href)
}

async function parseFlatOffer (getBrowser, flatOfferElement) {
  const url = await parseFlatOfferUrl(flatOfferElement)

  const flatOfferPage = await (await getBrowser()).newPage()
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
  const selfRenovation = title.includes('Selbstrenovier')

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
    selfRenovation,
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

  const page = await (await getBrowser()).newPage()
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

  async function selectRadio (elementOrSelector, optionIndex) {
    const radioGroup = typeof elementOrSelector === 'string'
      ? await form.$(elementOrSelector)
      : elementOrSelector
    await radioGroup.evaluate(
      (node, optionIndex) => node.children[optionIndex].click(),
      optionIndex
    )
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
  await (await form.$('[id*="grownUps"]')).type(String(contactData.numberOfAdults))
  await (await form.$('[id*="kids"]')).type(String(contactData.numberOfChildren))
  // IMPROVEMENT: Support all options (this just chooses "Sonstige")
  await selectOption(
    '[id*="employmentTypes"]',
    '#cdk-overlay-1 > div > div > ul',
    8,
    true
  )
  // IMPROVEMENT: Support all options (this just chooses "Sonstige")
  await selectOption(
    '[id*="income"]',
    '#cdk-overlay-2 > div > div > ul',
    1
  )
  await (await form.$('[id*="earliestMoveInDate"]')).type(formatDate(contactData.earliestDateToMoveIn))
  const wbsElement = await form.$('[id*="_wbs_"]') // _wbs_special_housing_need_
  if (wbsElement) {
    if (contactData.wbs) {
      await selectRadio(wbsElement, 0)
      await (await form.$('[id*="wbs_valid_until"]')).type(formatDate(contactData.wbs.validUntil))
      await selectOption(
        '[id*="eligibleNumberOfRooms"]',
        '#cdk-overlay-3 > div > div > ul',
        contactData.wbs.numberOfRooms - 1
      )
    } else {
      await wbsElement.evaluate(node => node.children[1].click())
    }
  }

  const wbsSpecialHousingNeedElement = await form.$('[id*="_wbs_special_housing_need_"]')
  if (wbsSpecialHousingNeedElement) {
    const labelElement = await form.$('[for*="_wbs_special_housing_need_"]')
    const labelText = await labelElement.evaluate(node => node.innerText)
    const isSpecialHousingNeedForElders = labelText.includes('Alte Menschen')
    const hasSpecialHousingNeed = isSpecialHousingNeedForElders
      ? contactData.wbs.specialHousingNeedForElders
      : contactData.wbs.specialHousingNeed
    const optionToSelect = contactData.wbs && hasSpecialHousingNeed ? 0 : 1
    await selectRadio(wbsSpecialHousingNeedElement, optionToSelect)
  }

  await selectRadio('[id*="pets"]', contactData.hasPets ? 0 : 1)
  await selectRadio('[id*="flatLoss"]', contactData.threatenedByLossOfHousing ? 0 : 1)
  await selectRadio('[id*="firstFlat"]', contactData.firstTimeHousehold ? 0 : 1)
  await selectRadio('[id*="m-schein-available"]', contactData.mBill ? 0 : 1)

  await (await form.$('[id*="dataPrivacy"]')).click()

  // Submit
  await form.evaluate(form => form.submit())

  await page.waitFor('.success-message', { visible: true })

  await saveScreenshot(page, flatOffer)

  await page.close()
}
