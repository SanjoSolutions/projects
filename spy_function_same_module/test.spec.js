import * as moduleAb from "./a_b";
import { a } from "./a_b.js";

describe("spy function same module", () => {
  test("spy function same module", () => {
    jest.spyOn(moduleAb, "b").mockImplementation(() => {
      return "mocked!";
    });

    expect(a()).toEqual("Hello from b()");
  });
});
