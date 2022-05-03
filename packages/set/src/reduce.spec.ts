import { describe, expect, it } from "@jest/globals";
import { reduce } from "./reduce.js";

describe("reduce", () => {
  it("reduces the set", () => {
    expect(
      reduce<number, number>(
        new Set([1, 2]),
        (aggregate, element) => aggregate + element
      )
    ).toEqual(3);
  });

  it("supports an initial value", () => {
    expect(
      reduce(new Set([1, 2]), (aggregate, element) => aggregate + element, 10)
    ).toEqual(13);
  });
});
