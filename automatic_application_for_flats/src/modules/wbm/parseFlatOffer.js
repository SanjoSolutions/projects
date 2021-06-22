import { createParseFlatOffer } from "../../lib/createParseFlatOffer.js";
import { applyForFlatOffer } from "./applyForFlatOffer.js";
import { WBMFlatOfferDetailPage } from "./WBMFlatOfferDetailPage.js";

export const parseFlatOffer = createParseFlatOffer({
  FlatOfferDetailPage: WBMFlatOfferDetailPage,
  applyForFlatOffer,
});
