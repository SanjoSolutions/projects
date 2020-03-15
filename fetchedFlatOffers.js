import util from 'util'
import path from 'path'
import _fs from 'fs'
const fs = {
  readFile: util.promisify(_fs.readFile),
  writeFile: util.promisify(_fs.writeFile)
}
import { __dirname } from './lib/__dirname.js'

const fetchedFlatOffersFileName = 'fetchedFlatOffers.json'
const defaultFetchedFlatOffersFileName = 'fetchedFlatOffers.default.json'

async function readFetchedFlatOffers () {
  return JSON.parse(
    await fs.readFile(`./${fetchedFlatOffersFileName}`, { encoding: 'utf8' })
  )
}

async function readDefaultFetchedFlatOffers () {
  return JSON.parse(
    await fs.readFile(`./${defaultFetchedFlatOffersFileName}`, { encoding: 'utf8' })
  )
}

async function writeFetchedFlatOffers (fetchedFlatOffers) {
  await fs.writeFile(
    path.join(__dirname(import.meta.url), fetchedFlatOffersFileName),
    JSON.stringify(fetchedFlatOffers, null, 2),
    { encoding: 'utf8' }
  )
}

export async function hasFetchedFlatOffer(url) {
  const fetchedFlatOffers = await readFetchedFlatOffers()
  return Boolean(fetchedFlatOffers[url])
}

export async function registerFlatOfferAsFetched (url) {
  const fetchedFlatOffers = await readFetchedFlatOffers()
  fetchedFlatOffers[url] = true
  await writeFetchedFlatOffers(fetchedFlatOffers)
}

export async function resetFetchedFlatOffers() {
  const defaultFetchedFlatOffers = await readDefaultFetchedFlatOffers()
  await writeFetchedFlatOffers(defaultFetchedFlatOffers)
}
