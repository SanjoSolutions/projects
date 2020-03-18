import { findAsync } from '../../lib/findAsync.js'
import { FlatOfferDetailPage } from '../../lib/FlatOfferDetailPage.js'

export class GesobauFlatOfferDetailPage extends FlatOfferDetailPage {
  async getCosts () {
    if (!this.costs) {
      const costsBlocks = await this.page.$$('.kosten')
      const costsBlock = await findAsync(costsBlocks, async costsBlock => {
        const header = await costsBlock.$('header h2')
        const headerText = await header.evaluate(node => node.innerHTML)
        return headerText === 'Kosten'
      })

      const costsDataRows = await costsBlock.$$('dl > div')
      this.costs = await Promise.all(costsDataRows.map(async costsDataRow => {
        const keyElement = await costsDataRow.$('dt')
        const key = await keyElement.evaluate(node => node.innerHTML)
        const valueElement = await costsDataRow.$('dd')
        const value = await valueElement.evaluate(node => node.innerText)
        return [key, value]
      }))
    }

    return this.costs
  }

  async getCost (keyToFind) {
    return (await this.getCosts()).find(([key]) => key === keyToFind)
  }

  async getKeyFigures () {
    if (!this.keyFigures) {
      const keyFiguresBlocks = await this.page.$$('.kennzahlen')
      const keyFiguresBlock = await findAsync(keyFiguresBlocks, async keyFiguresBlock => {
        const header = await keyFiguresBlock.$('header h2')
        const headerText = await header.evaluate(node => node.innerHTML)
        return headerText === 'Kennzahlen'
      })

      const keyFiguresRows = await keyFiguresBlock.$$('dl > div')
      this.keyFigures = await Promise.all(keyFiguresRows.map(async keyFiguresRow => {
        const keyElement = await keyFiguresRow.$('dt')
        const key = await keyElement.evaluate(node => node.innerHTML)
        const valueElement = await keyFiguresRow.$('dd')
        const value = await valueElement.evaluate(node => node.innerText)
        return [key, value]
      }))
    }

    return this.keyFigures
  }

  async getKeyFigure (keyToFind) {
    return (await this.getKeyFigures()).find(([key]) => key === keyToFind)
  }

  async getColdRent () {
    const coldRentText = (await this.getCost('Kaltmiete'))[1]
    return parseFloat(coldRentText.replace(',', '.'))
  }

  async getColdServiceCharges () {
    const coldServiceChargesText = (await this.getCost('Betriebskosten'))[1]
    return parseFloat(coldServiceChargesText.replace(',', '.'))
  }

  async getWarmServiceCharges () {
    const warmServiceChargesText = (await this.getCost('Heizkosten'))[1]
    return parseFloat(warmServiceChargesText.replace(',', '.'))
  }

  async getArea () {
    const areaX = await this.getKeyFigure('Wohnfläche')
    return parseFloat(areaX[1].replace(',', '.'))
  }

  async getNumberOfRooms () {
    const numberOfRoomsX = await this.getKeyFigure('Anzahl Zimmer')
    return parseInt(numberOfRoomsX[1], 10)
  }
}
