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
const { getMissingFields } = require('./lib/getMissingFields.js')

const modulesDirectoryName = 'modules'

const modulesPath = path.join(__dirname, modulesDirectoryName)

function verifyContactData (contactData) {
  const minimumRequiredFields = [
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
  const missingRequiredFields = getMissingFields(minimumRequiredFields, contactData)
  if (missingRequiredFields.length >= 1) {
    throw new Error(`Missing required fields in contact data: ${missingRequiredFields.join(', ')}`)
  }
}

function process (getBrowser, flatOfferFetchers, { intervalBetweenProcessRuns, contactData, shouldStop }) {
  console.log('Fetching flat offers...')
  fetchFlatOffers(
    getBrowser,
    intervalBetweenProcessRuns,
    flatOfferFetchers,
    onFlatOffer.bind(null, getBrowser, contactData),
    shouldStop
  )
}

async function onFlatOffer (getBrowser, contactData, flatOffer) {
  if (!haveAppliedForFlatOffer(flatOffer) && kommtInFrage(flatOffer)) {
    await apply(getBrowser, contactData, flatOffer)
  }
}

async function getFlatOfferFetchers () {
  const flatOfferFetchers = []
  for (const fileName of await fs.readdir(modulesPath)) {
    const filePath = path.join(modulesPath, fileName)
    if (
      isJavaScriptFile(filePath) &&
      !path.basename(fileName).startsWith('_') &&
      !path.basename(fileName, path.extname(fileName)).endsWith('_test')
    ) {
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

function fetchFlatOffers (getBrowser, intervalBetweenProcessRuns, flatOfferFetchers, onFlatOffer, shouldStop) {
  for (const fetch of flatOfferFetchers) {
    fetch(getBrowser, intervalBetweenProcessRuns, onFlatOffer, shouldStop)
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
    forPeopleOfAge(flatOffer, 29) &&
    flatOffer.area <= 50 && // m ** 2
    flatOffer.numberOfRooms <= 2 &&
    (
      !flatOffer.url.includes('howoge') ||
      972.15 >= 3 * totalRent(flatOffer) // Haushaltsnettoeinkommen >= 3 * Gesamtmiete
    ) &&
    (!flatOffer.hasOwnProperty('selfRenovation') || flatOffer.selfRenovation === Boolean(contactData.selfRenovation))
  )
}

function totalRent (flatOffer) {
  return flatOffer.coldRent + flatOffer.coldServiceCharges + flatOffer.warmServiceCharges
}

function forPeopleOfAge (flatOffer, age) {
  return (
    !isFlatOfferForSeniorsOnly(flatOffer) &&
    (!flatOffer.hasOwnProperty('requiredMinimumAge') || age >= flatOffer.requiredMinimumAge)
  )
}

function isFlatOfferForSeniorsOnly (flatOffer) {
  return flatOffer.seniorsOnly
}

async function apply (getBrowser, contactData, flatOffer) {
  console.log('Applying for flat offer: ', flatOffer)
  // console.log('Simulating…')
  if (typeof flatOffer.apply === 'function') {
    await flatOffer.apply(getBrowser, contactData)
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
