import { describe, expect, it } from "@jest/globals";
import { ensureEntryInMap } from "./ensureEntryInMap.js";

describe("ensureEntryInMap", () => {
  it("ensures an entry in a map", () => {
    const map = new Map();
    const key = "a";
    const defaultValue = 0;
    ensureEntryInMap(map, key, () => defaultValue);
    expect(map.get(key)).toEqual(defaultValue);
  });
});
