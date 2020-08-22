// Use cases:
// Sending pixels to server
  // 0: Sending pixels drawn by user (tuple of (x, y) tuples)
// 1: Requesting pixels for viewport (also tells the server the active viewport, for sending pixels drawn by other users.)
// Receiving pixels from server
  // 1: Receiving pixels for viewport (ArrayBuffer for requested {minX, maxX, minY, maxY})
  // 2: Receiving pixels drawn by other user (tuple of (x, y) tuples)

// x, y ∈ ℤ
// 32bit Number for x and y

// List of length, List item 1, ..., List item n
// For [{x: 1, y: 2}, {x: 3, y: 4}]
// 2, 1, 2, 3, 4
// Uint32, Int32, Int32, Int32, Int32

// Network packet format:

import { littleEndian } from './littleEndian.js'

function sendPixelsToServer(pixels) {
  const data = createSendPixelsToServerPaket(pixels)
  socket.send(data)
}

export function createSendPixelsToServerPaket (pixels) {
  const data = new ArrayBuffer(1 + 4 + pixels.length * 2 * 4)
  const view = new DataView(data)
  view.setUint8(0, 0)
  view.setUint32(1, pixels.length, littleEndian)
  for (let index = 0; index < pixels.length; index++) {
    const { x, y } = pixels[index]
    view.setInt32(1 + 4 + index * 2 * 4, x, littleEndian)
    view.setInt32(1 + 4 + index * 2 * 4 + 4, y, littleEndian)
  }
  return data
}

function requestPixelsForViewport({minX, maxX, minY, maxY}) {
  const data = createRequestPixelsForViewportPaket({minX, maxX, minY, maxY})
  socket.send(data)
}

export function createRequestPixelsForViewportPaket ({minX, maxX, minY, maxY}) {
  const data = new ArrayBuffer(1 + 4 * 4)
  const view = new DataView(data)
  view.setUint8(0, 1)
  view.setInt32(1 + 0 * 4, minX, littleEndian)
  view.setInt32(1 + 1 * 4, maxX, littleEndian)
  view.setInt32(1 + 2 * 4, minY, littleEndian)
  view.setInt32(1 + 3 * 4, maxY, littleEndian)
  return data
}

function onReceivePixelsForViewport(data) {

}

function onReceivePixelsDrawnByOtherUser(data) {
  const view = new DataView(data)
  const length = view.getUint32(1, littleEndian)
  const pixels = new Array(length)
  for (let index = 0; index < length; index++) {
    const pixel = {
      x: view.getInt32(1 + 4 + index * 2 * 4, littleEndian),
      y: view.getInt32(1 + 4 + index * 2 * 4 + 4, littleEndian)
    }
    pixels[index] = pixel
  }
  // TODO: Put pixels on canvas
}

// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:8080')

// Connection opened
socket.addEventListener('open', function (event) {
  const data = new ArrayBuffer(4)
  const view = new Uint8Array(data)
  view[0] = 1
  view[1] = 2
  view[2] = 3
  view[3] = 4
  socket.send(data)
})

// Listen for messages
socket.addEventListener('message', async function (event) {
  const data = await event.data.arrayBuffer()
  const view = new DataView(data)
  const code = view.getUint8(0)
  switch (code) {
    case 1:
      onReceivePixelsForViewport(data)
      return
    case 2:
      onReceivePixelsDrawnByOtherUser(data)
      return
    default:
      console.error(`Handler for code ${code} not implemented.`)
  }
})
