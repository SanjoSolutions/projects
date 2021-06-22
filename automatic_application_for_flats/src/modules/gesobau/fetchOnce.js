import { createFetchOnce } from "../../lib/createFetchOnce.js";
import { GESOBAUFlatOfferListPage } from "./GESOBAUFlatOfferListPage.js";
import { navigateToNextPage } from "./navigateToNextPage.js";
import { parseFlatOffer } from "./parseFlatOffer.js";

export const fetchOnce = createFetchOnce({
  flatOffersUrl: "https://www.gesobau.de/mieten/wohnungssuche.html",
  parseFlatOffer,
  navigateToNextPage,
  FlatOfferListPage: GESOBAUFlatOfferListPage,
});
