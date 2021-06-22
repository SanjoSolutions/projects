import { createFetchOnce } from "../../lib/createFetchOnce.js";
import { GewobagFlatOfferListPage } from "./GewobagFlatOfferListPage.js";
import { navigateToNextPage } from "./navigateToNextPage.js";
import { parseFlatOffer } from "./parseFlatOffer.js";

export const fetchOnce = createFetchOnce({
  flatOffersUrl:
    "https://www.gewobag.de/fuer-mieter-und-mietinteressenten/mietangebote/?bezirke_all=&bezirke%5B%5D=charlottenburg-wilmersdorf&bezirke%5B%5D=charlottenburg-wilmersdorf-charlottenburg&bezirke%5B%5D=friedrichshain-kreuzberg&bezirke%5B%5D=friedrichshain-kreuzberg-friedrichshain&bezirke%5B%5D=lichtenberg&bezirke%5B%5D=lichtenberg-falkenberg&bezirke%5B%5D=marzahn-hellersdorf&bezirke%5B%5D=marzahn-hellersdorf-marzahn&bezirke%5B%5D=mitte&bezirke%5B%5D=mitte-moabit&bezirke%5B%5D=neukoelln&bezirke%5B%5D=neukoelln-buckow&bezirke%5B%5D=neukoelln-neukoelln&bezirke%5B%5D=neukoelln-rudow&bezirke%5B%5D=pankow&bezirke%5B%5D=pankow-prenzlauer-berg&bezirke%5B%5D=reinickendorf&bezirke%5B%5D=reinickendorf-reinickendorf&bezirke%5B%5D=reinickendorf-tegel&bezirke%5B%5D=reinickendorf-waidmannslust&bezirke%5B%5D=spandau&bezirke%5B%5D=spandau-haselhorst&bezirke%5B%5D=tempelhof-schoeneberg&bezirke%5B%5D=tempelhof-schoeneberg-schoeneberg&nutzungsarten%5B%5D=wohnung&gesamtmiete_von=&gesamtmiete_bis=&gesamtflaeche_von=&gesamtflaeche_bis=&zimmer_von=&zimmer_bis=",
  parseFlatOffer,
  navigateToNextPage,
  FlatOfferListPage: GewobagFlatOfferListPage,
});
