import { describe, it } from '@jest/globals'
import { createSendPixelsToServerPaket } from './client.js'
import { littleEndian } from './littleEndian.js'
import { pixelPaketToArray } from './pixelPaketToArray.js'
import { pixelPaketEquals } from './pixelsPaketEquals.js'

describe('client', () => {
  describe('createSendPixelsToServerPaket', () => {
    it('creates a paket for sending pixels to the server', () => {
      const pixels = [
        {x: 1, y: 2},
        {x: 3, y: 4}
      ]
      const paket = createSendPixelsToServerPaket(pixels)
      const expectedPaket = new ArrayBuffer(41)
      const expectedPaketView = new DataView(expectedPaket)
      expectedPaketView.setUint8(0, 0)
      expectedPaketView.setBigUint64(1, BigInt(pixels.length), littleEndian)
      expectedPaketView.setBigInt64(9, 1n, littleEndian)
      expectedPaketView.setBigInt64(17, 2n, littleEndian)
      expectedPaketView.setBigInt64(25, 3n, littleEndian)
      expectedPaketView.setBigInt64(33, 4n, littleEndian)
      // expect(pixelPaketEquals(paket, expectedPaket)).toEqual(true)
      expect(pixelPaketToArray(paket)).toEqual(pixelPaketToArray(expectedPaket))
    })
  })
})
