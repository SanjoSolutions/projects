import { getInnerTextProperty } from "./getInnerTextProperty.js";

describe("getInnerTextProperty", () => {
  it("returns the innerText property", () => {
    const node = { innerText: "test" };

    const innerText = getInnerTextProperty(node);

    expect(innerText).toEqual("test");
  });
});
