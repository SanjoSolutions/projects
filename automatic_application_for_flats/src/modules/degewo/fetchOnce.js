import { createFetchOnce } from "../../lib/createFetchOnce.js";
import { DegewoFlatOfferListPage } from "./DegewoFlatOfferListPage.js";
import { navigateToNextPage } from "./navigateToNextPage.js";
import { parseFlatOffer } from "./parseFlatOffer.js";

export const fetchOnce = createFetchOnce({
  flatOffersUrl:
    "https://immosuche.degewo.de/de/search?size=10&page=1&property_type_id=1&categories%5B%5D=1&lat=&lon=&area=&address%5Bstreet%5D=&address%5Bcity%5D=&address%5Bzipcode%5D=&address%5Bdistrict%5D=&address%5Braw%5D=&district=&property_number=&price_switch=false&price_radio=null&price_from=&price_to=&qm_radio=null&qm_from=&qm_to=&rooms_radio=null&rooms_from=&rooms_to=&wbs_required=&order=rent_total_without_vat_asc",
  parseFlatOffer,
  navigateToNextPage,
  FlatOfferListPage: DegewoFlatOfferListPage,
});
