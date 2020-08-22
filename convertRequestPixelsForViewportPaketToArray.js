import { littleEndian } from './littleEndian.js'

export function convertRequestPixelsForViewportPaketToArray (paket) {
  const view = new DataView(paket)
  return [
    view.getUint8(0),
    view.getBigInt64(1, littleEndian),
    view.getBigInt64(1 + 1 * 8, littleEndian),
    view.getBigInt64(1 + 2 * 8, littleEndian),
    view.getBigInt64(1 + 3 * 8, littleEndian),
  ]
}
