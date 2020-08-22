import { describe, it } from '@jest/globals'
import { createRequestPixelsForViewportPaket } from './client.js'
import { convertRequestPixelsForViewportPaketToArray } from './convertRequestPixelsForViewportPaketToArray.js'
import { convertViewportToArray } from './convertViewportToArray.js'
import { createViewportFixture } from './fixtures/createViewportFixture.js'
import { toBigInt } from './toBigInt.js'

describe('convertRequestPixelsForViewportPaketToArray', () => {
  it('converts a requestPixelsForViewport paket to an array', () => {
    const viewport = createViewportFixture()
    const paket = createRequestPixelsForViewportPaket(viewport)
    expect(convertRequestPixelsForViewportPaketToArray(paket))
      .toEqual([1, toBigInt(convertViewportToArray(viewport))].flat())
  })
})
