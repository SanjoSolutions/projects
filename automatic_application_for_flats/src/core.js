import { readJSON } from '@sanjo/read-json'
import { writeJSON } from '@sanjo/write-json'
import { promises as fs } from 'fs'
import path from 'path'
import { notify } from './flat_offer_notifier.js'
import { determineDirname } from './lib/determineDirname.js'
import { getMissingFields } from './lib/getMissingFields.js'
import { isBoolean } from './lib/isBoolean.js'
import { isNumber } from './lib/isNumber.js'

const modulesDirectoryName = 'modules'

const __dirname = determineDirname(import.meta.url)

const modulesPath = path.join(__dirname, modulesDirectoryName)

export function verifyContactData(contactData) {
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
    'monthlyIncome',
    'earliestDateToMoveIn',
    'wbs',
    'hasPets',
    'threatenedByLossOfHousing',
    'firstTimeHousehold',
    'mBill',
  ]
  const missingRequiredFields = getMissingFields(minimumRequiredFields, contactData)
  if (missingRequiredFields.length >= 1) {
    throw new Error(`Missing required fields in contact data: ${missingRequiredFields.join(', ')}`)
  }
}

export function process(getBrowser, flatOfferFetchers, { intervalBetweenProcessRuns, contactData, shouldStop }) {
  console.log('Fetching flat offers...')
  fetchFlatOffers(
    getBrowser,
    intervalBetweenProcessRuns,
    flatOfferFetchers,
    onFlatOffer.bind(null, getBrowser, contactData),
    shouldStop
  )
}

async function onFlatOffer(getBrowser, contactData, flatOffer) {
  if (!(await haveNotifiedOfFlatOffer(flatOffer)) && kommtInFrage(contactData, flatOffer)) {
    await notifyOf(getBrowser, contactData, flatOffer)
  }
}

export async function getFlatOfferFetchers() {
  const flatOfferFetchers = []
  for (const fileName of await fs.readdir(modulesPath)) {
    let filePath = path.join(modulesPath, fileName)
    let stats = await fs.stat(filePath)
    if (stats.isDirectory()) {
      filePath = path.join(filePath, 'index.js')
      stats = await fs.stat(filePath)
    }
    if (
      isJavaScriptFile(filePath) &&
      !path.basename(fileName).startsWith('_') &&
      !path.basename(fileName, path.extname(fileName)).endsWith('_test')
    ) {
      if (stats.isFile()) {
        const module = await import('file:///' + filePath)
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

function fetchFlatOffers(getBrowser, intervalBetweenProcessRuns, flatOfferFetchers, onFlatOffer, shouldStop) {
  for (const fetch of flatOfferFetchers) {
    fetch(getBrowser, intervalBetweenProcessRuns, onFlatOffer, shouldStop)
  }
}

// TODO: Needs unit tests
export function kommtInFrage(contactData, flatOffer) {
  const maxWarmRent = 600.0
  const monthlyIncome = contactData.monthlyIncome
  return (
    (!flatOffer.wbs || contactData.wbs) &&
    totalRent(flatOffer) <= maxWarmRent &&
    forPeopleOfAge(flatOffer, 30) &&
    flatOffer.area <= 50 && // m ** 2
    flatOffer.numberOfRooms <= 2 &&
    (!flatOffer.url.includes('howoge') || monthlyIncome >= 3 * totalRent(flatOffer)) && // Haushaltsnettoeinkommen >= 3 * Gesamtmiete
    (!isBoolean(flatOffer.selfRenovation) || flatOffer.selfRenovation === Boolean(contactData.selfRenovation))
  )
}

function totalRent(flatOffer) {
  if (
    isNumber(flatOffer.coldRent) &&
    isNumber(flatOffer.coldServiceCharges) &&
    isNumber(flatOffer.warmServiceCharges)
  ) {
    return flatOffer.coldRent + flatOffer.coldServiceCharges + flatOffer.warmServiceCharges
  } else if (isNumber(flatOffer.warmRent)) {
    return flatOffer.warmRent
  } else if (isNumber(flatOffer.coldRent) && isNumber(flatOffer.serviceCharges)) {
    return flatOffer.coldRent + flatOffer.serviceCharges
  }
}

function forPeopleOfAge(flatOffer, age) {
  return (
    !isFlatOfferForSeniorsOnly(flatOffer) &&
    (typeof flatOffer.requiredMinimumAge !== 'number' || age >= flatOffer.requiredMinimumAge)
  )
}

function isFlatOfferForSeniorsOnly(flatOffer) {
  return Boolean(flatOffer.seniorsOnly)
}

async function notifyOf(getBrowser, contactData, flatOffer) {
  console.log('Sending notification for flat offer: ', flatOffer)
  await notify(flatOffer, contactData)
  await registerFlatOfferAsNotifiedOf(flatOffer)
}

// IMPROVEMENT: Structure code of haveNotifiedOfFlatOffer and registerFlatOfferAsNotifiedOf like fetchedFlatOffers.js
// IMPROVEMENT: Save flatOffer data for manual validation (like it is done for fetchedFlatOffers.json)
async function haveNotifiedOfFlatOffer(flatOffer) {
  const flatOffersNotifiedOf = await readFlatOffersNotifiedOf()
  return flatOffersNotifiedOf.includes(flatOffer.url)
}

const flatOffersNotifiedOfPath = path.resolve(__dirname, '..', 'flatOffersNotifiedOf.json')

async function registerFlatOfferAsNotifiedOf(flatOffer) {
  const flatOffersNotifiedOf = await readFlatOffersNotifiedOf()
  flatOffersNotifiedOf.push(flatOffer.url)
  await writeJSON(flatOffersNotifiedOfPath, flatOffersNotifiedOf)
}

async function readFlatOffersNotifiedOf() {
  return await readJSON(flatOffersNotifiedOfPath)
}

// IMPROVEMENT: Structure code of haveNotifiedOfFlatOffer and registerFlatOfferAsNotifiedOf like fetchedFlatOffers.js
// IMPROVEMENT: Save flatOffer data for manual validation (like it is done for fetchedFlatOffers.json)
async function haveAppliedForFlatOffer(flatOffer) {
  const flatOffersAppliedTo = await readFlatOffersAppliedTo()
  return flatOffersAppliedTo.includes(flatOffer.url)
}

const flatOffersAppliedToPath = path.resolve(__dirname, '..', 'flatOffersAppliedTo.json')

export async function registerFlatOfferAsAppliedTo(flatOffer) {
  const flatOffersAppliedTo = await readFlatOffersAppliedTo()
  flatOffersAppliedTo.push(flatOffer.url)
  await writeJSON(flatOffersAppliedToPath, flatOffersAppliedTo)
}

async function readFlatOffersAppliedTo() {
  return await readJSON(flatOffersAppliedToPath)
}

function isJavaScriptFile(filePath) {
  return ['.js', '.mjs', '.cjs'].includes(path.extname(filePath))
}
