import { expect, specification } from "../packages/specification/index.js";
import { sum, times } from "./index.js";

specification("sum objects", function () {
  const A = {
    a: 2,
    b: -1,
  };

  const B = {
    b: 1,
  };

  const _ = [A, B];

  expect(sum(_)).toEqual({
    a: 2,
    b: 0,
  });
});

specification("sum numbers", function () {
  expect(sum([1, 2, 3])).toEqual(6);
});

specification("times", function () {
  const number = 2;
  const object = { a: 2, b: 3 };
  expect(times(number, object)).toEqual({
    a: 4,
    b: 6,
  });
});
