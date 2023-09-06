/**
 * @jest-environment jsdom
 */

import { afterEach, beforeEach, describe, expect, it } from "@jest/globals"
import { unmountComponentAtNode } from "react-dom"
import { act } from "react-dom/test-utils"
import { createContainer } from "./createContainer.js"
import { renderOS } from "./renderOS.js"

describe("operation system", () => {
  let container: HTMLDivElement

  beforeEach(function () {
    container = createContainer()
  })

  afterEach(function () {
    unmountComponentAtNode(container)
    container.remove()
  })

  it("starts", () => {
    act(() => {
      renderOS(container)
    })

    expect(container.textContent).toEqual("Welcome")
  })
})
