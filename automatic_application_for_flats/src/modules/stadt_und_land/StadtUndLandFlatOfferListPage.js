import { FlatOfferListPage } from "../../lib/FlatOfferListPage.js";
import { getFlatOfferElements } from "../../lib/getFlatOfferElements.js";
import { StadtUndLandFlatOfferListElement } from "./StadtUndLandFlatOfferListElement.js";

export class StadtUndLandFlatOfferListPage extends FlatOfferListPage {
  async getFlatOfferElements() {
    const flatOfferElementsSelector = ".SP-SearchResult .SP-TeaserList__item";
    return await getFlatOfferElements(
      this.page,
      flatOfferElementsSelector,
      StadtUndLandFlatOfferListElement
    );
  }

  async getNumberOfResultsElement() {
    return await this.page.$(".SP-SearchResult__amount strong:nth-child(3)");
  }
}
