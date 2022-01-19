/**
 * @jest-environment jsdom
 */

import { act } from 'react-dom/test-utils'
import { createContainer } from './createContainer.js'
import { renderOS } from './renderOS.js'

describe('operation system', () => {
  let container: HTMLDivElement

  beforeEach(function () {
    container = createContainer()
  })

  it('starts', () => {
    act(() => {
      renderOS(container)
    })

    expect(container.textContent).toEqual('Welcome')
  })
})
