import { powerSet } from "../../packages/set/built/set.js";

export function getAllNCardsCombinations(cards, numberOfCards) {
  return new Set(
    [...powerSet(cards)].filter((set) => set.size === numberOfCards)
  );
}
