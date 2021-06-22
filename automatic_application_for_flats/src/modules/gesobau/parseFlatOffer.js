import { createParseFlatOffer } from "../../lib/createParseFlatOffer.js";
import { GesobauFlatOfferDetailPage } from "./GesobauFlatOfferDetailPage.js";

export const parseFlatOffer = createParseFlatOffer({
  FlatOfferDetailPage: GesobauFlatOfferDetailPage,
  applyForFlatOffer: null,
});
