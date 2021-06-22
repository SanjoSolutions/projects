import { createParseFlatOffer } from "../../lib/createParseFlatOffer.js";
import { applyForFlatOffer } from "./applyForFlatOffer.js";
import { HOWOGEFlatOfferDetailPage } from "./HOWOGEFlatOfferDetailPage.js";

export const parseFlatOffer = createParseFlatOffer({
  FlatOfferDetailPage: HOWOGEFlatOfferDetailPage,
  applyForFlatOffer,
});
