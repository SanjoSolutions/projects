/**
 * @jest-environment jsdom
 */

import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals'

function createButton({
  onStartWebServer,
  onStopWebServer,
}: {
  onStartWebServer: () => void
  onStopWebServer: () => void
}) {
  let isWebServerRunning = false

  const button = document.createElement('button')
  setTextToStartWebServer()

  function setTextToStartWebServer(): void {
    setText('Start web server')
  }

  function setTextToStopWebServer(): void {
    setText('Stop web server')
  }

  function setText(text: string): void {
    button.textContent = text
  }

  button.addEventListener('click', function onClick() {
    toggleIsWebServerRunning()
    updateText()
    callCallback()
  })

  function toggleIsWebServerRunning() {
    isWebServerRunning = !isWebServerRunning
  }

  function updateText() {
    if (isWebServerRunning) {
      setTextToStopWebServer()
    } else {
      setTextToStartWebServer()
    }
  }

  function callCallback() {
    if (isWebServerRunning) {
      onStartWebServer()
    } else {
      onStopWebServer()
    }
  }

  return button
}

describe('Web server start and stop button', () => {
  let container: HTMLDivElement

  beforeEach(function () {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(function () {
    container.remove()
  })

  it('renders a button for starting and stopping a web server', () => {
    const onStartWebServer = jest.fn()
    const onStopWebServer = jest.fn()
    const button = createButton({ onStartWebServer, onStopWebServer })
    container.appendChild(button)
    expect(button.textContent).toEqual('Start web server')

    button.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(button.textContent).toEqual('Stop web server')
    expect(onStartWebServer).toHaveBeenCalled()

    button.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(button.textContent).toEqual('Start web server')
    expect(onStopWebServer).toHaveBeenCalled()
  })
})
