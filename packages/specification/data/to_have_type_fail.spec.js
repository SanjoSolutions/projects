import { specification, expect } from "../index.js";

specification(function () {
  class A {}
  class B {}
  const b = new B();
  expect(b).toHaveType(A);
});
