const WebSocket = require("ws")

const wss = new WebSocket.Server({ port: 8080 })

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(data) {
    console.log("data", data)
  })

  const data = new ArrayBuffer(4)
  const view = new Uint8Array(data)
  view[0] = 1
  view[1] = 2
  view[2] = 3
  view[3] = 4
  ws.send(data)
})
