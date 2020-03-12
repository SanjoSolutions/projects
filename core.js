// Node.js 10

module.exports = {
  verifyContactData,
  process,
  getFlatOfferFetchers
}

const util = require('util')
const path = require('path')
const _fs = require('fs')
const fs = {
  readdir: util.promisify(_fs.readdir),
  stat: util.promisify(_fs.stat),
  writeFile: util.promisify(_fs.writeFile)
}
const { notify } = require('./flat_offer_notifier.js')

const modulesDirectoryName = 'modules'

const modulesPath = path.join(__dirname, modulesDirectoryName)

function verifyContactData (contactData) {
  const minimumRequiredFields = ['firstName', 'lastName', 'email', 'phone']
  const missingRequiredFields = minimumRequiredFields.filter(fieldName => !contactData[fieldName])
  if (missingRequiredFields.length >= 1) {
    throw new Error(`Missing required fields in contact data: ${missingRequiredFields.join(', ')}`)
  }
}

async function process (browser, flatOfferFetchers, { intervalBetweenProcessRuns, contactData }) {
  console.log('Fetching flat offers...')
  fetchFlatOffers(
    browser,
    intervalBetweenProcessRuns,
    flatOfferFetchers,
    onFlatOffer.bind(null, browser, contactData)
  )
}

async function onFlatOffer (browser, contactData, flatOffer) {
  if (!haveAppliedForFlatOffer(flatOffer) && kommtInFrage(flatOffer)) {
    await apply(browser, contactData, flatOffer)
  }
}

async function getFlatOfferFetchers () {
  const flatOfferFetchers = []
  for (const fileName of await fs.readdir(modulesPath)) {
    const filePath = path.join(modulesPath, fileName)
    if (isJavaScriptFile(filePath) && !path.basename(fileName, path.extname(fileName)).endsWith('_test')) {
      const stats = await fs.stat(filePath)
      if (stats.isFile()) {
        const module = require(filePath)
        const fetcher = module.fetch
        if (!fetcher) {
          throw new Error(`Module "${filePath}" has no expected export "fetch".`)
        }
        if (typeof fetcher !== 'function') {
          throw new Error(`Module "${filePath}" export "fetch" has not the expected type "function".`)
        }
        flatOfferFetchers.push(fetcher)
      }
    }
  }
  return flatOfferFetchers
}

function fetchFlatOffers (browser, intervalBetweenProcessRuns, flatOfferFetchers, onFlatOffer) {
  for (const fetch of flatOfferFetchers) {
    fetch(browser, intervalBetweenProcessRuns, onFlatOffer, () => false)
  }
}

function kommtInFrage (flatOffer) {
  const maxColdRentPlusColdServiceCharges = 463.65
  const maxWarmServiceCharges = 76.50
  return (
    (
      (
        flatOffer.hasOwnProperty('coldRent') &&
        flatOffer.hasOwnProperty('coldServiceCharges') &&
        flatOffer.hasOwnProperty('warmServiceCharges') &&
        flatOffer.coldRent + flatOffer.coldServiceCharges <= maxColdRentPlusColdServiceCharges &&
        flatOffer.warmServiceCharges <= maxWarmServiceCharges
      ) ||
      (
        flatOffer.hasOwnProperty('warmRent') &&
        flatOffer.warmRent <= maxColdRentPlusColdServiceCharges + maxWarmServiceCharges
      ) ||
      (
        flatOffer.hasOwnProperty('coldRent') &&
        flatOffer.hasOwnProperty('serviceCharges') &&
        flatOffer.coldRent + flatOffer.serviceCharges <= maxColdRentPlusColdServiceCharges + maxWarmServiceCharges
      )
    ) &&
    for29YearOldPeople(flatOffer) &&
    flatOffer.area <= 50 && // m ** 2
    flatOffer.numberOfRooms <= 2 &&
    (
      !flatOffer.url.includes('howoge') ||
      972.15 >= 3 * totalRent(flatOffer) // Haushaltsnettoeinkommen >= 3 * Gesamtmiete
    )
  )
}

function totalRent (flatOffer) {
  return flatOffer.coldRent + flatOffer.coldServiceCharges + flatOffer.warmServiceCharges
}

function for29YearOldPeople (flatOffer) {
  const age = 29
  return (
    !isFlatOfferForSeniorsOnly(flatOffer) &&
    (!flatOffer.hasOwnProperty('requiredMinimumAge') || age >= flatOffer.requiredMinimumAge)
  )
}

function isFlatOfferForSeniorsOnly (flatOffer) {
  return flatOffer.seniorsOnly
}

async function apply (browser, contactData, flatOffer) {
  console.log('Applying for flat offer: ', flatOffer)
  // console.log('Simulating…')
  if (typeof flatOffer.apply === 'function') {
    await flatOffer.apply(browser, contactData)
  } else {
    await notify(flatOffer, contactData)
  }
  await registerFlatOfferAsAppliedTo(flatOffer)
  console.log('Applied for flat offer: ', flatOffer)
}

function haveAppliedForFlatOffer (flatOffer) {
  const flatOffersAppliedTo = require('./flatOffersAppliedTo.json')
  return flatOffersAppliedTo.includes(flatOffer.url)
}

async function registerFlatOfferAsAppliedTo (flatOffer) {
  const flatOffersAppliedTo = require('./flatOffersAppliedTo.json')
  flatOffersAppliedTo.push(flatOffer.url)
  await fs.writeFile(
    path.join(__dirname, 'flatOffersAppliedTo.json'),
    JSON.stringify(flatOffersAppliedTo, null, 2)
  )
}

function isJavaScriptFile (filePath) {
  return ['.js', '.mjs', '.cjs'].includes(path.extname(filePath))
}
