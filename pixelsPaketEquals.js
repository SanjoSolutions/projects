import { arrayEquals } from './arrayEquals.js'
import { littleEndian } from './littleEndian.js'

export function pixelPaketEquals (a, b) {
  return (
    codeEquals(a, b) &&
    pixelsArrayLengthEquals(a, b) &&
    pixelsEqual(a, b)
  )
}

export function codeEquals (a, b) {
  const va = new DataView(a)
  const vb = new DataView(b)
  const codeByteOffset = 0
  return va.getUint8(codeByteOffset) === vb.getUint8(codeByteOffset)
}

export function pixelsArrayLengthEquals (a, b) {
  return getPixelsArrayLength(a) === getPixelsArrayLength(b)
}

export function getPixelsArrayLength (paket) {
  const view = new DataView(paket)
  const pixelsArrayLengthByteOffset = 1
  return view.getUint32(pixelsArrayLengthByteOffset, littleEndian)
}

export function pixelsEqual(a, b) {
  const pixelsByteOffset = 5
  const ta = new Int32Array(a, pixelsByteOffset)
  const tb = new Int32Array(b, pixelsByteOffset)
  return arrayEquals(ta, tb)
}
