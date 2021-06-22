import { FlatOfferListElement } from "../../lib/FlatOfferListElement.js";
import { isTitleOfSeniorsOnlyFlat } from "../../lib/isTitleOfSeniorsOnlyFlat.js";
import { parseCurrencyText } from "../../lib/parseCurrencyText.js";
import { parseFloatNumberText } from "../../lib/parseFloatNumberText.js";
import { parseNumberOfRooms } from "../../lib/parseNumberOfRooms.js";

export class WBMFlatOfferListElement extends FlatOfferListElement {
  async getUrl() {
    const linkElement = await this.element.$("a");
    return await linkElement.evaluate((node) => node.href);
  }

  async getData() {
    if (!this.data) {
      const dataRows = await this.element.$$("ul.main-property-list li");
      this.data = await Promise.all(
        dataRows.map(async (dataRow) => {
          const keyElement = await dataRow.$("div:nth-child(1)");
          const key = await keyElement.evaluate((node) => node.innerHTML);
          const valueElement = await dataRow.$("div:nth-child(2)");
          const value = await valueElement.evaluate((node) => node.innerText);
          return [key, value];
        })
      );
    }

    return this.data;
  }

  async getDataEntry(keyToFind) {
    return (await this.getData()).find(([key]) => key === keyToFind);
  }

  async getWarmRent() {
    const warmRentText = (await this.getDataEntry("Gesamtmiete:"))[1];
    return parseCurrencyText(warmRentText);
  }

  async getArea() {
    const areaText = (await this.getDataEntry("Größe:"))[1];
    return parseFloatNumberText(areaText.replace(".", ","));
  }

  async getNumberOfRooms() {
    const numberOfRoomsText = (await this.getDataEntry("Zimmer:"))[1];
    return parseNumberOfRooms(numberOfRoomsText);
  }

  async getTitle() {
    const titleElement = await this.element.$("h2");
    return await titleElement.evaluate((node) => node.innerText);
  }

  async getSeniorsOnly() {
    return isTitleOfSeniorsOnlyFlat(await this.getTitle());
  }
}
