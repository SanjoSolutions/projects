import {
  compressMoveFromServerData,
  decompressMoveFromServerData,
} from "./communication.js"

const compressedData = compressMoveFromServerData({
  connectionId: "2",
  isMoving: true,
  direction: 0b100,
  x: 5,
  y: 3,
  i: 7,
})

console.log(compressedData)

const decompressedData = decompressMoveFromServerData(compressedData)

console.log(decompressedData)
