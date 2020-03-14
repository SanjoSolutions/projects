module.exports = {
  fetch
}

const { getMissingFields } = require('../lib/getMissingFields.js')
const { saveScreenshot } = require('../lib/saveScreenshot.js')

const host = 'https://immosuche.degewo.de'

async function fetch (getBrowser, intervalBetweenProcessRuns, onFlatOffer, shouldStop) {
  while (!shouldStop()) {
    const page = await (await getBrowser()).newPage()
    await page.goto(host + '/de/search?size=10&page=1&property_type_id=1&categories%5B%5D=1&lat=&lon=&area=&address%5Bstreet%5D=&address%5Bcity%5D=&address%5Bzipcode%5D=&address%5Bdistrict%5D=&address%5Braw%5D=&district=&property_number=&price_switch=false&price_radio=null&price_from=&price_to=&qm_radio=null&qm_from=&qm_to=&rooms_radio=null&rooms_from=&rooms_to=&wbs_required=&order=rent_total_without_vat_asc')
    let nextButton
    do {
      const flatOfferElements = await page.$$('.search__results article')
      for (const flatOfferElement of flatOfferElements) {
        const flatOffer = await parseFlatOffer(getBrowser, flatOfferElement)
        onFlatOffer(flatOffer)
      }
      nextButton = await page.$('a[rel="next"]')
      if (nextButton) {
        await nextButton.click()
        await page.waitFor('.search__results--loading', {hidden: true})
      }
    } while (nextButton)

    await wait(intervalBetweenProcessRuns)
    await page.close()
  }
}

async function parseFlatOffer (getBrowser, flatOfferElement) {
  const linkElement = await flatOfferElement.$('a')
  const url = await linkElement.evaluate(node => node.href)

  const flatOfferPage = await (await getBrowser()).newPage()
  await flatOfferPage.goto(url)

  const coldRentElement = await flatOfferElement.$('.price')
  const coldRentText = await coldRentElement.evaluate(node => node.innerText)
  const coldRent = parseFloat(coldRentText.replace(',', '.'))

  const coldServiceChargesElement = await flatOfferPage.$('.article .ce-table.expose__header-details > .ce-table__row > .ce-table__row-item:nth-child(2) > ul > li:nth-child(1)')
  const coldServiceChargesText = await coldServiceChargesElement.evaluate(node => node.innerText)
  let result = /^Betriebskosten \(kalt\): (.+)$/.exec(coldServiceChargesText)
  if (!result) {
    throw new Error("Couldn't find cold service charges.")
  }
  const coldServiceCharges = parseFloat(result[1].replace(',', '.'))

  const warmServiceChargesElement = await flatOfferPage.$('.article .ce-table.expose__header-details > .ce-table__row > .ce-table__row-item:nth-child(2) > ul > li:nth-child(2)')
  const warmServiceChargesText = await warmServiceChargesElement.evaluate(node => node.innerText)
  result = /^Betriebskosten \(warm\): (.+)$/.exec(warmServiceChargesText)
  if (!result) {
    throw new Error("Couldn't find warm service charges.")
  }
  const warmServiceCharges = parseFloat(result[1].replace(',', '.'))

  const objectDetailsElement = await flatOfferPage.$('#c1358 > :nth-child(2) > :nth-child(1) > div.teaser-tileset__col-1')
  const objectDetailsTitleElement = await objectDetailsElement.$('.teaser-tileset__title')
  const objectDetailsTitle = await objectDetailsTitleElement.evaluate(node => node.innerText)
  if (objectDetailsTitle !== 'Objektdetails') {
    throw new Error("Couldn't find object details element.")
  }
  const objectDetailsRows = await objectDetailsElement.$$('.teaser-tileset__table-row')
  const objectDetails = await Promise.all(objectDetailsRows.map(async objectDetailsRow => {
    const key = await objectDetailsRow.evaluate(node => node.children[0].innerHTML)
    const value = await objectDetailsRow.evaluate(node => node.children[1].innerHTML)
    return [key, value]
  }))

  const areaX = objectDetails.find(([key]) => key === 'Wohnfläche')
  if (!areaX) {
    throw new Error("Couldn't find area.")
  }
  const area = parseFloat(areaX[1].replace(',', '.'))

  const numberOfRoomsX = objectDetails.find(([key]) => key === 'Zimmer')
  if (!numberOfRoomsX) {
    throw new Error("Couldn't find number of rooms.")
  }
  const numberOfRooms = parseInt(numberOfRoomsX[1], 10)

  const titleElement = await flatOfferElement.$('.article__title')
  const title = await titleElement.evaluate(node => node.innerText)
  const descriptionFirstParagraphElement = await flatOfferPage.$(
    '#c1358 > div:nth-child(2) > section:nth-child(2) > div.teaser-tileset__col-1 > section > header > p'
  )
  const descriptionFirstParagraphText = await descriptionFirstParagraphElement.evaluate(node => node.innerText)
  const seniorsOnly = title.includes('Senioren') ||
    /für ältere(?:n)? Menschen/.test(descriptionFirstParagraphText)

  await flatOfferPage.close()

  const flatOffer = {
    url,
    coldRent,
    coldServiceCharges,
    warmServiceCharges,
    area,
    numberOfRooms,
    seniorsOnly,
    async apply (getBrowser, contactData) {
      return await applyForFlatOffer(getBrowser, flatOffer, contactData)
    }
  }

  const requiredMinimumAgeRegExp = /([1-9][0-9]*) oder älter/
  result = requiredMinimumAgeRegExp.exec(title)
  if (result) {
    flatOffer.requiredMinimumAge = parseInt(result[1], 10)
  }

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

  await form.evaluate(form => {
    form.submit()
  })

  await saveScreenshot(page, flatOffer)

  await page.close()
}

async function wait(howLongInMs) {
  return new Promise(resolve => setTimeout(resolve, howLongInMs))
}
