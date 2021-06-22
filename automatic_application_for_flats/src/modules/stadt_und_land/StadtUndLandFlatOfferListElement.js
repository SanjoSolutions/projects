import { FlatOfferListElement } from "../../lib/FlatOfferListElement.js";
import { isTitleOfSeniorsOnlyFlat } from "../../lib/isTitleOfSeniorsOnlyFlat.js";
import { parseCurrencyText } from "../../lib/parseCurrencyText.js";
import { parseFloatNumberText } from "../../lib/parseFloatNumberText.js";
import { parseNumberOfRooms } from "../../lib/parseNumberOfRooms.js";

export class StadtUndLandFlatOfferListElement extends FlatOfferListElement {
  async getUrl() {
    const linkElement = await this.element.$(".SP-Link--info");
    return await linkElement.evaluate((node) => node.href);
  }

  async getData() {
    if (!this.data) {
      const dataRows = await this.element.$$(".SP-Table--expose tbody tr");
      this.data = await Promise.all(
        dataRows.map(async (dataRow) => {
          const keyElement = await dataRow.$("th");
          const key = await keyElement.evaluate((node) => node.innerHTML);
          const valueElement = await dataRow.$("td");
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

  async getColdRent() {
    const coldRentText = (await this.getDataEntry("Kaltmiete:"))[1];
    return parseCurrencyText(coldRentText);
  }

  async getColdServiceCharges() {
    const coldServiceChargesText = (await this.getDataEntry("Nebenkosten:"))[1];
    return parseCurrencyText(coldServiceChargesText);
  }

  async getWarmServiceCharges() {
    const warmServiceChargesText = (await this.getDataEntry("Heizkosten:"))[1];
    return parseCurrencyText(warmServiceChargesText);
  }

  async getWarmRent() {
    const warmRentText = (await this.getDataEntry("Warmmiete:"))[1];
    return parseCurrencyText(warmRentText);
  }

  async getArea() {
    const areaText = (await this.getDataEntry("Wohnfläche:"))[1];
    return parseFloatNumberText(areaText.replace(".", ","));
  }

  async getNumberOfRooms() {
    const numberOfRoomsText = (await this.getDataEntry("Zimmer:"))[1];
    return parseNumberOfRooms(numberOfRoomsText);
  }

  async getTitle() {
    const titleElement = await this.element.$(".SP-Teaser__headline");
    return await titleElement.evaluate((node) => node.innerText);
  }

  async getSeniorsOnly() {
    return isTitleOfSeniorsOnlyFlat(await this.getTitle());
  }
}
