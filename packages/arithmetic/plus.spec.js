import { plus } from "./plus.js";

describe("plus", () => {
  it("adds two numbers", () => {
    expect(plus(1, 2)).toEqual(3);
  });
});
