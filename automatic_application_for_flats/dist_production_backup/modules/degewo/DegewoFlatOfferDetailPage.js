"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.DegewoFlatOfferDetailPage = void 0;

var _FlatOfferDetailPage = require("../../lib/FlatOfferDetailPage.js");

var _getInnerTextAndExtractCurrencyValueFromLabeledTextOrThrowError = require("../../lib/getInnerTextAndExtractCurrencyValueFromLabeledTextOrThrowError.js");

var _parseCurrencyText = require("../../lib/parseCurrencyText.js");

var _parseNumberOfRooms = require("../../lib/parseNumberOfRooms.js");

class DegewoFlatOfferDetailPage extends _FlatOfferDetailPage.FlatOfferDetailPage {
  async getObjectDetails() {
    if (!this.objectDetails) {
      const objectDetailsElement = await this.page.$(
        "#c1358 > :nth-child(2) > :nth-child(1) > div.teaser-tileset__col-1"
      );
      const objectDetailsTitleElement = await objectDetailsElement.$(
        ".teaser-tileset__title"
      );
      const objectDetailsTitle = await objectDetailsTitleElement.evaluate(
        (node) => node.innerText
      );

      if (objectDetailsTitle !== "Objektdetails") {
        throw new Error("Couldn't find object details element.");
      }

      const objectDetailsRows = await objectDetailsElement.$$(
        ".teaser-tileset__table-row"
      );
      this.objectDetails = await Promise.all(
        objectDetailsRows.map(async (objectDetailsRow) => {
          const key = await objectDetailsRow.evaluate(
            (node) => node.children[0].innerHTML
          );
          const value = await objectDetailsRow.evaluate(
            (node) => node.children[1].innerHTML
          );
          return [key, value];
        })
      );
    }

    return this.objectDetails;
  }

  async getObjectDetail(keyToFind) {
    return (await this.getObjectDetails()).find(([key]) => key === keyToFind);
  }

  async getColdServiceCharges() {
    return await (0,
    _getInnerTextAndExtractCurrencyValueFromLabeledTextOrThrowError.getInnerTextAndExtractCurrencyValueFromLabeledTextOrThrowError)(
      this.page,
      ".article .ce-table.expose__header-details " +
        "> .ce-table__row > .ce-table__row-item:nth-child(2) > ul > li:nth-child(1)",
      "Betriebskosten (kalt)",
      "Couldn't find cold service charges."
    );
  }

  async getWarmServiceCharges() {
    return await (0,
    _getInnerTextAndExtractCurrencyValueFromLabeledTextOrThrowError.getInnerTextAndExtractCurrencyValueFromLabeledTextOrThrowError)(
      this.page,
      ".article .ce-table.expose__header-details " +
        "> .ce-table__row > .ce-table__row-item:nth-child(2) > ul > li:nth-child(2)",
      "Betriebskosten (warm)",
      "Couldn't find warm service charges."
    );
  }

  async getArea() {
    const areaX = await this.getObjectDetail("Wohnfläche");

    if (!areaX) {
      throw new Error("Couldn't find area.");
    }

    return (0, _parseCurrencyText.parseCurrencyText)(areaX[1]);
  }

  async getNumberOfRooms() {
    const numberOfRoomsX = await this.getObjectDetail("Zimmer");

    if (!numberOfRoomsX) {
      throw new Error("Couldn't find number of rooms.");
    }

    return (0, _parseNumberOfRooms.parseNumberOfRooms)(numberOfRoomsX[1]);
  }

  async getSeniorsOnly() {
    const descriptionFirstParagraphElement = await this.page.$(
      "#c1358 > div:nth-child(2) > section:nth-child(2) > div.teaser-tileset__col-1 > section > header > p"
    );
    const descriptionFirstParagraphText = await descriptionFirstParagraphElement.evaluate(
      (node) => node.innerText
    );
    return /für ältere(?:n)? Menschen/.test(descriptionFirstParagraphText);
  }
}

exports.DegewoFlatOfferDetailPage = DegewoFlatOfferDetailPage;
//# sourceMappingURL=DegewoFlatOfferDetailPage.js.map
