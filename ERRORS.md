(node:10113) UnhandledPromiseRejectionWarning: Error: Navigation failed because browser has disconnected!
    at CDPSession.LifecycleWatcher._eventListeners.helper.addEventListener (/Users/self/Documents/automatic_application_for_flats/node_modules/puppeteer/lib/LifecycleWatcher.js:46:107)
    at CDPSession.emit (events.js:198:13)
    at CDPSession._onClosed (/Users/self/Documents/automatic_application_for_flats/node_modules/puppeteer/lib/Connection.js:215:10)
    at Connection._onClose (/Users/self/Documents/automatic_application_for_flats/node_modules/puppeteer/lib/Connection.js:138:15)
    at WebSocketTransport._ws.addEventListener.event (/Users/self/Documents/automatic_application_for_flats/node_modules/puppeteer/lib/WebSocketTransport.js:48:22)
    at WebSocket.onClose (/Users/self/Documents/automatic_application_for_flats/node_modules/ws/lib/event-target.js:124:16)
    at WebSocket.emit (events.js:198:13)
    at WebSocket.emitClose (/Users/self/Documents/automatic_application_for_flats/node_modules/ws/lib/websocket.js:191:10)
    at Socket.socketOnClose (/Users/self/Documents/automatic_application_for_flats/node_modules/ws/lib/websocket.js:850:15)
    at Socket.emit (events.js:198:13)
  -- ASYNC --
    at Frame.<anonymous> (/Users/self/Documents/automatic_application_for_flats/node_modules/puppeteer/lib/helper.js:111:15)
    at Page.goto (/Users/self/Documents/automatic_application_for_flats/node_modules/puppeteer/lib/Page.js:672:49)
    at Page.<anonymous> (/Users/self/Documents/automatic_application_for_flats/node_modules/puppeteer/lib/helper.js:112:23)
    at parseFlatOffer (/Users/self/Documents/automatic_application_for_flats/modules/degewo.js:40:23)
    at process._tickCallback (internal/process/next_tick.js:68:7)
(node:10113) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). (rejection id: 1)
(node:10113) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.

