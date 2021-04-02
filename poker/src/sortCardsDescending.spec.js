import { sortCardsDescending } from "./sortCardsDescending.js";

describe("sortCardsDescending", () => {
  it("sorts the given cards in descending order", () => {
    const cards = new Set([
      "2h",
      "3h",
      "4h",
      "5h",
      "6h",
      "7h",
      "8h",
      "9h",
      "Th",
      "Jh",
      "Qh",
      "Kh",
      "Ah",
      "Ac",
      "As",
      "Ad",
    ]);
    expect(sortCardsDescending(cards)).toEqual([
      "Ad",
      "As",
      "Ac",
      "Ah",
      "Kh",
      "Qh",
      "Jh",
      "Th",
      "9h",
      "8h",
      "7h",
      "6h",
      "5h",
      "4h",
      "3h",
      "2h",
    ]);
  });
});
