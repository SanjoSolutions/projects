import { describe, expect, it } from "@jest/globals";
import { flat } from "./flat.js";

describe("flat", () => {
  it("flattens the set", () => {
    expect(flat(new Set([new Set([1])]))).toEqual(new Set([1]));
  });

  it("can flatten with depth 2", () => {
    const set = new Set([new Set([new Set([1])])]);

    expect(flat(set, 2)).toEqual(new Set([1]));
  });

  it("can flatten with depth 3", () => {
    const set = new Set([new Set([new Set([new Set([1])])])]);

    expect(flat(set, 3)).toEqual(new Set([1]));
  });

  it("handles sets which have sets and numbers as elements", () => {
    const set = new Set([new Set([1]), 2]);

    expect(flat(set)).toEqual(new Set([1, 2]));
  });
});
