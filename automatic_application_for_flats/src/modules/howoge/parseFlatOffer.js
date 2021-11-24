import { createParseFlatOffer } from "../../lib/createParseFlatOffer.js";
import { HOWOGEFlatOfferDetailPage } from "./HOWOGEFlatOfferDetailPage.js";

export const parseFlatOffer = createParseFlatOffer({
  FlatOfferDetailPage: HOWOGEFlatOfferDetailPage,
  applyForFlatOffer: null,
});
