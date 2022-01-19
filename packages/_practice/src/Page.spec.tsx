/**
 * @jest-environment jsdom
 */

import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { createContainer } from './createContainer'
import { Page } from './Page'

describe('Page', () => {
  let container: HTMLDivElement

  beforeEach(function () {
    container = createContainer()
  })

  afterEach(function () {
    unmountComponentAtNode(container)
    container.remove()
  })

  it('renders children inside', () => {
    const page = <Page>Welcome</Page>
    act(() => {
      render(page, container)
    })
    expect(container.textContent).toEqual('Welcome')
  })
})
