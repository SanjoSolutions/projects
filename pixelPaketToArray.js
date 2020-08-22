import { littleEndian } from './littleEndian.js'

export function pixelPaketToArray (pixelPaket) {
  const view = new DataView(pixelPaket)
  return [view.getUint8(0), view.getBigUint64(1, littleEndian)]
    .concat(Array.from(new BigInt64Array(pixelPaket.slice(9))))
}
