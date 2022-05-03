import { describe, expect, it } from "@jest/globals";
import { groupByToMap } from "./groupByToMap.js";

describe("groupByToMap", () => {
  it("groups and returns a map", () => {
    expect(groupByToMap([1, 2, 3], (element) => element % 2)).toEqual(
      new Map([
        [1, [1, 3]],
        [0, [2]],
      ])
    );
  });
});
