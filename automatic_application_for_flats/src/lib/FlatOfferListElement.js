import { mixin } from "./mixin.js";
import { Element } from "./Element.js";
import { FlatOfferInformationRetriever } from "./FlatOfferInformationRetriever.js";

export class FlatOfferListElement extends Element {
  getUrl() {
    return null;
  }
}

mixin(FlatOfferListElement, FlatOfferInformationRetriever);
