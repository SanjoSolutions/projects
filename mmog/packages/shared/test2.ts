import { decompressMoveDataWithI } from "./communication.js"

const decompressedData = decompressMoveDataWithI(
  "\u0010\u0002\u0019����Y�F@(\u0004",
)

console.log(decompressedData)
