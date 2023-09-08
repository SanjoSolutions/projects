import {
  compressMoveDataWithI,
  decompressMoveDataWithI,
} from "./communication.js"

const compressedData = compressMoveDataWithI({
  isMoving: true,
  direction: 0b100,
  x: 5,
  y: 3,
  i: 7,
})

console.log(compressedData)

const decompressedData = decompressMoveDataWithI(compressedData)

console.log(decompressedData)
