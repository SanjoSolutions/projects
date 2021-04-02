import { expect, specification } from "../packages/specification/index.js";
import { isOnLine } from "./isOnLine.js";

specification("is on line", function () {
  const a = { x: 0, y: 0 };
  const b = { x: 10, y: 10 };
  const p = { x: 2, y: 2 };
  expect(isOnLine(a, b, p)).toEqual(true);
});

specification("is not on line", function () {
  const a = { x: 0, y: 0 };
  const b = { x: 10, y: 10 };
  const p = { x: 2, y: 4 };
  expect(isOnLine(a, b, p)).toEqual(false);
});
