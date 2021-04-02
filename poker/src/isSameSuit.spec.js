import { isSameSuit } from "./isSameSuit.js";

describe("isSameSuit", () => {
  it("returns true if cards have the same suit", () => {
    expect(isSameSuit(new Set(["2s", "3s"]))).toEqual(true);
  });

  it("returns false if cards do not have the same suit", () => {
    expect(isSameSuit(new Set(["2s", "3h"]))).toEqual(false);
  });
});
