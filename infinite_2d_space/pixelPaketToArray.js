import { littleEndian } from "./littleEndian.js";

export function pixelPaketToArray(pixelPaket) {
  const view = new DataView(pixelPaket);
  return [view.getUint8(0), view.getUint32(1, littleEndian)].concat(
    Array.from(new Int32Array(pixelPaket.slice(5)))
  );
}
