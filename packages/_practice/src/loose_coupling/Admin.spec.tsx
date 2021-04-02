/**
 * @jest-environment jsdom
 */

import React from "react"
import { render, unmountComponentAtNode } from "react-dom"
import { act } from "react-dom/test-utils"

function Admin({
  onStartWebServer,
  onStopWebServer,
}: {
  onStartWebServer: () => void
  onStopWebServer: () => void
}) {
  const [isWebServerRunning, setIsWebServerRunning] = React.useState(false)

  function toggleIsWebServerRunning() {
    const newIsWebServerRunning = !isWebServerRunning
    setIsWebServerRunning(newIsWebServerRunning)
    if (newIsWebServerRunning) {
      onStartWebServer()
    } else {
      onStopWebServer()
    }
  }

  return (
    <button onClick={toggleIsWebServerRunning}>
      {(isWebServerRunning ? "Stop" : "Start") + " web server"}
    </button>
  )
}

describe("Admin", () => {
  let container: HTMLDivElement

  beforeEach(function () {
    container = document.createElement("div")
    document.body.appendChild(container)
  })

  afterEach(function () {
    unmountComponentAtNode(container)
    container.remove()
  })

  it("displays a toggle button for starting and stopping the web server", () => {
    const onStartWebServer = jest.fn()
    const onStopWebServer = jest.fn()
    act(() => {
      render(
        <Admin
          onStartWebServer={onStartWebServer}
          onStopWebServer={onStopWebServer}
        />,
        container
      )
    })

    const button = container.querySelector("button") as HTMLButtonElement
    expect(button).not.toBeNull()
    expect(button.textContent).toEqual("Start web server")

    act(() => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })

    expect(button.textContent).toEqual("Stop web server")
    expect(onStartWebServer).toHaveBeenCalled()

    act(() => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })

    expect(onStopWebServer).toHaveBeenCalled()
  })
})
