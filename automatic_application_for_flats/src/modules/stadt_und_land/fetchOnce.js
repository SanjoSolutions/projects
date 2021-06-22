import { createFetchOnce } from "../../lib/createFetchOnce.js";
import { navigateToNextPage } from "./navigateToNextPage.js";
import { parseFlatOffer } from "./parseFlatOffer.js";
import { StadtUndLandFlatOfferListPage } from "./StadtUndLandFlatOfferListPage.js";

export const fetchOnce = createFetchOnce({
  flatOffersUrl:
    "https://www.stadtundland.de/Mieten/010-Angebote-Bestand.php?form=stadtundland-expose-search-1.form&sp%3Acategories%5B3352%5D%5B%5D=-&sp%3Acategories%5B3352%5D%5B%5D=__last__&sp%3AroomsFrom%5B%5D=&sp%3AroomsTo%5B%5D=&sp%3ArentPriceFrom%5B%5D=&sp%3ArentPriceTo%5B%5D=&sp%3AareaFrom%5B%5D=&sp%3AareaTo%5B%5D=&sp%3Afeature%5B%5D=__last__&action=submit",
  parseFlatOffer,
  navigateToNextPage,
  FlatOfferListPage: StadtUndLandFlatOfferListPage,
});
