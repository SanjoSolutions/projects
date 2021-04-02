import { identity } from "../../packages/identity/src/identity.js";
import { getAllNCardsCombinations } from "./getAllNCardsCombinations.js";
import { isRoyalFlush } from "./isRoyalFlush.js";
import { isStraightFlush } from "./isStraightFlush.js";
import { sortStraightFlushesDescending } from "./sortStraightFlushesDescending.js";

export function getFiveBestCards(cards) {
  const madeHandTypes = [
    // royal flush
    {
      isHandType: isRoyalFlush,
      sortDescending: identity,
    },
    // straight flush
    {
      isHandType: isStraightFlush,
      sortDescending: sortStraightFlushesDescending,
    },
    // four of a kind
    // full house S
    // flush S
    // street S
    // three of a kind
    // two pairs S
    // pair S
    // high card S
  ];

  for (const { isHandType, sortDescending } of madeHandTypes) {
    const fiveCardsCombinations = getAllNCardsCombinations(cards, 5);
    const madeHands = [...fiveCardsCombinations].filter(isHandType);
    if (madeHands.length >= 1) {
      const sortedMadeHands = sortDescending(madeHands);
      if (sortedMadeHands.length >= 1) {
        const bestMadeHand = sortedMadeHands[0];
        return new Set(bestMadeHand);
      }
    }
  }
}
