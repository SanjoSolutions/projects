import { describe, expect, it } from "@jest/globals";
import { groupByToMap } from "./groupByToMap.js";

describe("groupByToMap", () => {
  it("groups and returns a map", () => {
    expect(groupByToMap(new Set([1, 2, 3]), (element) => element % 2)).toEqual(
      new Map([
        [1, new Set([1, 3])],
        [0, new Set([2])],
      ])
    );
  });
});
