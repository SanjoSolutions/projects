import { findAsync } from '../../lib/findAsync.js'
import { FlatOfferDetailPage } from '../../lib/FlatOfferDetailPage.js'
import { parseCurrencyText } from '../../lib/parseCurrencyText.js'
import { parseFloatNumberText } from '../../lib/parseFloatNumberText.js'
import { parseNumberOfRooms } from '../../lib/parseNumberOfRooms.js'

export class GesobauFlatOfferDetailPage extends FlatOfferDetailPage {
  async getCosts() {
    if (!this.costs) {
      const costsBlocks = await this.page.$$('.kosten')
      const costsBlock = await findAsync(costsBlocks, async costsBlock => {
        const header = await costsBlock.$('header h2')
        const headerText = await header.evaluate(node => node.innerHTML)
        return headerText === 'Kosten'
      })

      const costsDataRows = await costsBlock.$$('dl > div')
      this.costs = await Promise.all(
        costsDataRows.map(async costsDataRow => {
          const keyElement = await costsDataRow.$('dt')
          const key = await keyElement.evaluate(node => node.innerHTML)
          const valueElement = await costsDataRow.$('dd')
          const value = await valueElement.evaluate(node => node.innerText)
          return [key, value]
        })
      )
    }

    return this.costs
  }

  async getCost(keyToFind) {
    return (await this.getCosts()).find(([key]) => key === keyToFind)
  }

  async getKeyFigures() {
    if (!this.keyFigures) {
      const keyFiguresBlocks = await this.page.$$('.kennzahlen')
      const keyFiguresBlock = await findAsync(keyFiguresBlocks, async keyFiguresBlock => {
        const header = await keyFiguresBlock.$('header h2')
        const headerText = await header.evaluate(node => node.innerHTML)
        return headerText === 'Kennzahlen'
      })

      const keyFiguresRows = await keyFiguresBlock.$$('dl > div')
      this.keyFigures = await Promise.all(
        keyFiguresRows.map(async keyFiguresRow => {
          const keyElement = await keyFiguresRow.$('dt')
          const key = await keyElement.evaluate(node => node.innerHTML)
          const valueElement = await keyFiguresRow.$('dd')
          const value = await valueElement.evaluate(node => node.innerText)
          return [key, value]
        })
      )
    }

    return this.keyFigures
  }

  async getKeyFigure(keyToFind) {
    return (await this.getKeyFigures()).find(([key]) => key === keyToFind)
  }

  async getColdRent() {
    const coldRentText = (await this.getCost('Kaltmiete'))[1]
    return parseCurrencyText(coldRentText)
  }

  async getColdServiceCharges() {
    const coldServiceChargesText = (await this.getCost('Betriebskosten'))[1]
    return parseCurrencyText(coldServiceChargesText)
  }

  async getWarmServiceCharges() {
    const warmServiceChargesText = (await this.getCost('Heizkosten'))[1]
    return parseCurrencyText(warmServiceChargesText)
  }

  async getWarmRent() {
    const warmRentText = (await this.getCost('Miete inkl. NK'))[1]
    return parseCurrencyText(warmRentText)
  }

  async getArea() {
    const areaText = (await this.getKeyFigure('Wohnfläche'))[1]
    return parseFloatNumberText(areaText)
  }

  async getNumberOfRooms() {
    const numberOfRoomsText = (await this.getKeyFigure('Anzahl Zimmer'))[1]
    return parseNumberOfRooms(numberOfRoomsText)
  }

  async getWbs() {
    const wbsRequired = await this.getKeyFigure('WBS')
    return Boolean(wbsRequired && wbsRequired[1] === 'ja')
  }
}
