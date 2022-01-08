'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.createParseFlatOffer = createParseFlatOffer

function createParseFlatOffer({ FlatOfferDetailPage, applyForFlatOffer }) {
  return async function parseFlatOffer(getBrowser, flatOfferElement) {
    const url = await flatOfferElement.getUrl()
    const flatOfferPage = await (await getBrowser()).newPage()
    await flatOfferPage.goto(url)
    const page = new FlatOfferDetailPage(flatOfferPage)
    let flatOffer = {
      url,
    }
    const flatOfferProperties = [
      'coldRent',
      'coldServiceCharges',
      'warmServiceCharges',
      'serviceCharges',
      'warmRent',
      'area',
      'numberOfRooms',
      'seniorsOnly',
      'requiredMinimumAge',
      'selfRenovation',
    ]

    for (const flatOfferProperty of flatOfferProperties) {
      const getterName = `get${flatOfferProperty[0].toUpperCase() + flatOfferProperty.substring(1)}`
      let value

      if (flatOfferElement.__proto__.hasOwnProperty(getterName) && typeof flatOfferElement[getterName] === 'function') {
        value = await flatOfferElement[getterName]()
      } else if (page.__proto__.hasOwnProperty(getterName) && typeof page[getterName] === 'function') {
        value = await page[getterName]()
      } else {
        value = null
      }

      flatOffer[flatOfferProperty] = value
    }

    if (applyForFlatOffer) {
      flatOffer.apply = async function apply(getBrowser, contactData) {
        return await applyForFlatOffer(getBrowser, flatOffer, contactData)
      }
    }

    await flatOfferPage.close()
    return flatOffer
  }
}
//# sourceMappingURL=createParseFlatOffer.js.map
