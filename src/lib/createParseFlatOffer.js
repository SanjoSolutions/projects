export function createParseFlatOffer ({
  FlatOfferDetailPage,
  applyForFlatOffer
}) {
  return async function parseFlatOffer (getBrowser, flatOfferElement) {
    const url = await flatOfferElement.getUrl()

    const flatOfferPage = await (await getBrowser()).newPage()
    await flatOfferPage.goto(url)

    const page = new FlatOfferDetailPage(flatOfferPage)

    let flatOffer = { url }
    const flatOfferProperties = [
      'coldRent',
      'coldServiceCharges',
      'warmServiceCharges',
      'serviceCharges',
      'warmRent',
      'area',
      'numberOfRooms',
      'seniorsOnly',
      'requiredMinimumAge'
    ]
    flatOffer = flatOfferProperties.reduce((flatOffer, flatOfferProperty) => {
      const getterName = `get${flatOfferProperty[0].toUpperCase() + flatOfferProperty.substring(1)}`
      const elementGetter = flatOfferElement[getterName].bind(flatOfferElement)
      const pageGetter = page[getterName].bind(page)
      flatOffer[flatOfferProperty] = (
        (typeof elementGetter === 'function' && elementGetter()) ||
        (typeof pageGetter === 'function' && pageGetter()) ||
        null
      )
      return flatOffer
    }, flatOffer)
    flatOffer.apply = async function apply (getBrowser, contactData) {
      return await applyForFlatOffer(getBrowser, flatOffer, contactData)
    }

    await flatOfferPage.close()

    return flatOffer
  }
}
