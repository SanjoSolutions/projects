"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.HOWOGEFlatOfferDetailPage = void 0;

var _FlatOfferDetailPage = require("../../lib/FlatOfferDetailPage.js");

var _isTitleOfSeniorsOnlyFlat = require("../../lib/isTitleOfSeniorsOnlyFlat.js");

var _parseCurrencyText = require("../../lib/parseCurrencyText.js");

var _parseFloatNumberText = require("../../lib/parseFloatNumberText.js");

var _parseNumberOfRooms = require("../../lib/parseNumberOfRooms.js");

class HOWOGEFlatOfferDetailPage extends _FlatOfferDetailPage.FlatOfferDetailPage {
  async getCosts() {
    if (!this.costs) {
      const costsDataRows = await this.page.$$(".expenses .wrap > div");
      this.costs = await Promise.all(
        costsDataRows.map(async (costsDataRow) => {
          const keyElement = await costsDataRow.$("p");
          const key = await keyElement.evaluate((node) => node.innerHTML);
          const valueElement = await costsDataRow.$("div");
          const value = await valueElement.evaluate((node) => node.innerText);
          return [key, value];
        })
      );
    }

    return this.costs;
  }

  async getCost(keyToFind) {
    return (await this.getCosts()).find(([key]) => key === keyToFind);
  }

  async getKeyFigures() {
    if (!this.keyFigures) {
      const keyFiguresRows = await this.page.$$(".expose-facts .details tr");
      this.keyFigures = await Promise.all(
        keyFiguresRows.map(async (keyFiguresRow) => {
          const keyElement = await keyFiguresRow.$("th");
          const key = await keyElement.evaluate((node) => node.innerHTML);
          const valueElement = await keyFiguresRow.$("td");
          const value = await valueElement.evaluate((node) => node.innerText);
          return [key, value];
        })
      );
    }

    return this.keyFigures;
  }

  async getKeyFigure(keyToFind) {
    return (await this.getKeyFigures()).find(([key]) => key === keyToFind);
  }

  async getColdRent() {
    const coldRentText = (await this.getCost("Kaltmiete"))[1];
    return (0, _parseCurrencyText.parseCurrencyText)(coldRentText);
  }

  async getServiceCharges() {
    const serviceChargesText = (await this.getCost("Nebenkosten"))[1];
    return (0, _parseCurrencyText.parseCurrencyText)(serviceChargesText);
  }

  async getWarmRent() {
    const warmRent = await this.getCost("Warmmiete");
    return (0, _parseCurrencyText.parseCurrencyText)(warmRent[1]);
  }

  async getArea() {
    const areaText = (await this.getKeyFigure("Wohnfläche"))[1];
    return (0, _parseFloatNumberText.parseFloatNumberText)(areaText);
  }

  async getNumberOfRooms() {
    const numberOfRoomsText = (await this.getKeyFigure("Zimmer"))[1];
    return (0, _parseNumberOfRooms.parseNumberOfRooms)(numberOfRoomsText);
  }

  async getTitle() {
    const titleElement = (await this.page.$$(".expose-head .h1"))[1];
    return await titleElement.evaluate((node) => node.innerText);
  }

  async getSeniorsOnly() {
    return (0, _isTitleOfSeniorsOnlyFlat.isTitleOfSeniorsOnlyFlat)(
      await this.getTitle()
    );
  }
}

exports.HOWOGEFlatOfferDetailPage = HOWOGEFlatOfferDetailPage;
//# sourceMappingURL=HOWOGEFlatOfferDetailPage.js.map
