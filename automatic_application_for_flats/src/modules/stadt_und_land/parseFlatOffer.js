import { createParseFlatOffer } from "../../lib/createParseFlatOffer.js";
import { applyForFlatOffer } from "./applyForFlatOffer.js";
import { StadtUndLandFlatOfferDetailPage } from "./StadtUndLandFlatOfferDetailPage.js";

export const parseFlatOffer = createParseFlatOffer({
  FlatOfferDetailPage: StadtUndLandFlatOfferDetailPage,
  applyForFlatOffer,
});
