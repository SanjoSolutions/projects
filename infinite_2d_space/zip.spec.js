import { describe, it } from "@jest/globals";
import { zip } from "./zip.js";

describe("zip", () => {
  it("zipps", () => {
    const a = [1, 2, 3];
    const b = [4, 5, 6];
    expect(zip(a, b)).toEqual([
      [1, 4],
      [2, 5],
      [3, 6],
    ]);
  });

  describe("when the first array is longer", () => {
    it("inserts undefined", () => {
      const a = [1, 2, 3];
      const b = [4, 5];
      expect(zip(a, b)).toEqual([
        [1, 4],
        [2, 5],
        [3, undefined],
      ]);
    });
  });

  describe("when the second array is longer", () => {
    it("inserts undefined", () => {
      const a = [1, 2];
      const b = [4, 5, 6];
      expect(zip(a, b)).toEqual([
        [1, 4],
        [2, 5],
        [undefined, 6],
      ]);
    });
  });
});
