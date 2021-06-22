import { isNumber } from "./isNumber.js";

describe("isNumber", () => {
  it("returns true when value is a number", () => {
    expect(isNumber(1)).toBe(true);
  });

  it("returns false when value is null", () => {
    expect(isNumber(null)).toBe(false);
  });

  it("returns false when value is undefined", () => {
    expect(isNumber(undefined)).toBe(false);
  });

  it("returns false when value is a boolean", () => {
    expect(isNumber(false)).toBe(false);
  });

  it("returns false when value is an object", () => {
    expect(isNumber({})).toBe(false);
  });

  it("returns false when value is a string", () => {
    expect(isNumber("")).toBe(false);
  });
});
