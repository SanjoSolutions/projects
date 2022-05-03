import { describe, expect, it } from "@jest/globals";
import { find } from "./find.js";

describe("find", () => {
  it("finds the first element which the predicate evaluates as true", () => {
    expect(find(new Set([1, 2, 3]), (element) => element >= 2)).toEqual(2);
  });

  it("returns undefined when no element matches the predicate", () => {
    expect(find(new Set([1, 2, 3]), (element) => element >= 4)).toBeUndefined();
  });
});
