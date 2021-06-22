"use strict";

var _isNumber = require("./isNumber.js");

describe("isNumber", () => {
  it("returns true when value is a number", () => {
    expect((0, _isNumber.isNumber)(1)).toBe(true);
  });
  it("returns false when value is null", () => {
    expect((0, _isNumber.isNumber)(null)).toBe(false);
  });
  it("returns false when value is undefined", () => {
    expect((0, _isNumber.isNumber)(undefined)).toBe(false);
  });
  it("returns false when value is a boolean", () => {
    expect((0, _isNumber.isNumber)(false)).toBe(false);
  });
  it("returns false when value is an object", () => {
    expect((0, _isNumber.isNumber)({})).toBe(false);
  });
  it("returns false when value is a string", () => {
    expect((0, _isNumber.isNumber)("")).toBe(false);
  });
});
//# sourceMappingURL=isNumber.test.js.map
