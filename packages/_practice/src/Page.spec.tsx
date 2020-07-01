/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { createContainer } from './createContainer'
import { Page } from './Page'

describe('Page', () => {
  let container: HTMLDivElement

  beforeEach(function () {
    container = createContainer()
  })

  it('renders children inside', () => {
    const page = <Page>Welcome</Page>
    act(() => {
      render(page, container)
    })
    expect(container.textContent).toEqual('Welcome')
  })
})
