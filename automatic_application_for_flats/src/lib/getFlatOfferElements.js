import { FlatOfferListElement } from "./FlatOfferListElement.js";

export async function getFlatOfferElements(
  page,
  flatOfferElementsSelector,
  FlatOfferListElement = FlatOfferListElement
) {
  return (await page.$$(flatOfferElementsSelector)).map(
    (element) => new FlatOfferListElement(element)
  );
}
