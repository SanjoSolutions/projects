import { getRankValue } from "./getRankValue.js";
import { getSuit } from "./getSuit.js";
import { getSuitValue } from "./getSuitValue.js";
import { getRank } from "./getRank.js";

export function sortCardsDescending(cards) {
  cards = [...cards];
  cards.sort((cardA, cardB) => {
    const cardAValue =
      getSuitValue(getSuit(cardA)) * 13 + getRankValue(getRank(cardA));
    const cardBValue =
      getSuitValue(getSuit(cardB)) * 13 + getRankValue(getRank(cardB));
    return cardBValue - cardAValue;
  });
  return cards;
}
