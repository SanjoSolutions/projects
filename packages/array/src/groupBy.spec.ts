import { describe, expect, it } from "@jest/globals";
import { groupBy } from "./groupBy.js";

describe("groupBy", () => {
  it("groups", () => {
    expect(groupBy([1, 2, 3], (element) => element % 2)).toEqual({
      "1": [1, 3],
      "0": [2],
    });
  });
});
