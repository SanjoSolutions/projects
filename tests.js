const { process } = require('./core.js')

const browser = {}
let onFlatOffer
const testFetcher = function (browser, intervalBetweenProcessRuns, _onFlatOffer, shouldStop) {
  onFlatOffer = _onFlatOffer
}
const flatOfferFetchers = [testFetcher]
const intervalBetweenProcessRuns = 0
const contactData = {}

process (browser, flatOfferFetchers, { intervalBetweenProcessRuns, contactData })
const flatOffer = {}
onFlatOffer(flatOffer)

