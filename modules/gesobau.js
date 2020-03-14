module.exports = {
  fetch,
  fetchOnce
}

const { hasFetchedFlatOffer, registerFlatOfferAsFetched } = require('../fetchedFlatOffers.js')
const { wait } = require('../lib/wait.js')

// https://www.gesobau.de/mieten/wohnungssuche.html

async function fetch (getBrowser, intervalBetweenProcessRuns, onFlatOffer, shouldStop) {
  const page = await (await getBrowser()).newPage()

  while (!shouldStop()) {
    await fetchOnce(getBrowser, page, onFlatOffer)
    await wait(intervalBetweenProcessRuns)
  }

  await page.close()
}

async function fetchOnce(getBrowser, page, onFlatOffer) {
  await page.goto('https://www.gesobau.de/mieten/wohnungssuche.html')
  let nextButton
  do {
    const flatOfferElements = await page.$$('#c5316 #list > div > div > div')
    for (const flatOfferElement of flatOfferElements) {
      const url = await parseFlatOfferUrl(flatOfferElement)
      if (!hasFetchedFlatOffer(url)) {
        const flatOffer = await parseFlatOffer(getBrowser, flatOfferElement)
        onFlatOffer(flatOffer).then(async () => {
          await registerFlatOfferAsFetched(url)
        })
      }
    }
    /*
    // Momentan nur eine Seite
    nextButton = await page.$('a[rel="next"]')
    if (nextButton) {
      await nextButton.click()
      await page.waitFor('.search__results--loading', {hidden: true})
    }
    */
  } while (nextButton)
}

async function parseFlatOfferUrl(flatOfferElement) {
  const linkElement = await flatOfferElement.$('.list_item-title a')
  return await linkElement.evaluate(node => node.href)
}

async function parseFlatOffer (getBrowser, flatOfferElement) {
  const url = await parseFlatOfferUrl(flatOfferElement)

  const flatOfferPage = await (await getBrowser()).newPage()
  await flatOfferPage.goto(url)

  const costsBlocks = await flatOfferPage.$$('.kosten')
  const costsBlock = await findAsync(costsBlocks, async costsBlock => {
    const header = await costsBlock.$('header h2')
    const headerText = await header.evaluate(node => node.innerHTML)
    return headerText === 'Kosten'
  })

  const costsDataRows = await costsBlock.$$('dl > div')
  const costsData = await Promise.all(costsDataRows.map(async costsDataRow => {
    const keyElement = await costsDataRow.$('dt')
    const key = await keyElement.evaluate(node => node.innerHTML)
    const valueElement = await costsDataRow.$('dd')
    const value = await valueElement.evaluate(node => node.innerText)
    return [key, value]
  }))

  function getCostsDataEntry(keyToFind) {
    return costsData.find(([key]) => key === keyToFind)
  }

  const coldRentText = getCostsDataEntry('Kaltmiete')[1]
  const coldRent = parseFloat(coldRentText.replace(',', '.'))

  const coldServiceChargesText = getCostsDataEntry('Betriebskosten')[1]
  const coldServiceCharges = parseFloat(coldServiceChargesText.replace(',', '.'))

  const warmServiceChargesText = getCostsDataEntry('Heizkosten')[1]
  const warmServiceCharges = parseFloat(warmServiceChargesText.replace(',', '.'))

  const keyFiguresBlocks = await flatOfferPage.$$('.kennzahlen')
  const keyFiguresBlock = await findAsync(keyFiguresBlocks, async keyFiguresBlock => {
    const header = await keyFiguresBlock.$('header h2')
    const headerText = await header.evaluate(node => node.innerHTML)
    return headerText === 'Kennzahlen'
  })

  const keyFiguresRows = await keyFiguresBlock.$$('dl > div')
  const keyFigures = await Promise.all(keyFiguresRows.map(async keyFiguresRow => {
    const keyElement = await keyFiguresRow.$('dt')
    const key = await keyElement.evaluate(node => node.innerHTML)
    const valueElement = await keyFiguresRow.$('dd')
    const value = await valueElement.evaluate(node => node.innerText)
    return [key, value]
  }))

  function getKeyFigure(keyToFind) {
    return keyFigures.find(([key]) => key === keyToFind)
  }

  const areaX = getKeyFigure('Wohnfläche')
  const area = parseFloat(areaX[1].replace(',', '.'))

  const numberOfRoomsX = getKeyFigure('Anzahl Zimmer')
  const numberOfRooms = parseInt(numberOfRoomsX[1], 10)

  const titleElement = await flatOfferElement.$('.list_item-title')
  const title = await titleElement.evaluate(node => node.innerText)
  const seniorsOnly = title.includes('Senioren')

  await flatOfferPage.close()

  return {
    url,
    coldRent,
    coldServiceCharges,
    warmServiceCharges,
    area,
    numberOfRooms,
    seniorsOnly
  }
}

async function findAsync(iterable, matcher) {
  for (const value of iterable) {
    if (await matcher(value)) {
      return value
    }
  }
  return null
}
