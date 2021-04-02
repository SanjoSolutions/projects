/**
 * @jest-environment jsdom
 */

import { act } from "react-dom/test-utils";
import { createContainer } from "./createContainer";
import { renderOS } from "./renderOS";

describe("operation system", () => {
  let container;

  beforeEach(function () {
    container = createContainer();
  });

  it("starts", () => {
    act(() => {
      renderOS(container);
    });

    expect(container.textContent).toEqual("Welcome");
  });
});
