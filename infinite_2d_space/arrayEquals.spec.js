import { describe, it } from "@jest/globals";
import { arrayEquals } from "./arrayEquals.js";

describe("arrayEquals", () => {
  it("returns true when two arrays equal", () => {
    const a = [1, 2, 3];
    const b = [1, 2, 3];
    expect(arrayEquals(a, b)).toEqual(true);
  });

  it("returns false when two arrays don't equal", () => {
    const a = [1, 2];
    const b = [1, 3];
    expect(arrayEquals(a, b)).toEqual(false);
  });
});
