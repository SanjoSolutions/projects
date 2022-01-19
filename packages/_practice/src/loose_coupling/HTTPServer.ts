import type { IncomingMessage, RequestListener, Server, ServerResponse } from 'http'
import http from 'http'
import { ListenOptions } from 'net'
import { URL } from 'url'
import { promisify } from 'util'

const protocol = 'http'

function createDefaultRequestHandler(responseText: string, contentType: string | null = null): RequestListener {
  return function defaultRequestHandler(request: IncomingMessage, response: ServerResponse) {
    if (contentType) {
      response.setHeader('content-type', contentType)
    }
    response.writeHead(200)
    response.end(responseText)
  }
}

function notFoundRequestHandler(request: IncomingMessage, response: ServerResponse): void {
  response.end()
}

export class HTTPServer {
  private _port: number
  private _server: Server
  private _requestHandlers: Map<string, RequestListener>
  private _notFoundRequestHandler: RequestListener

  constructor(port: number = 80) {
    this._port = port
    this._requestListener = this._requestListener.bind(this)
    this._onError = this._onError.bind(this)
    this._server = http.createServer(this._requestListener)
    this._server.on('error', this._onError)
    this._requestHandlers = new Map()
    this._notFoundRequestHandler = notFoundRequestHandler
  }

  route(pathname: string, responseText: string, contentType: string | null = null) {
    this._requestHandlers.set(pathname, createDefaultRequestHandler(responseText, contentType))
  }

  listen(): Promise<void> {
    return new Promise((resolve, reject) => {
      const onListening = () => {
        this._server.off('error', onError)
        resolve()
      }

      const onError = (error: Error) => {
        this._server.off('listening', onListening)
        reject(error)
      }

      this._server.once('listening', onListening)
      this._server.once('error', onError)
      this._server.listen(this._port)
    })
  }

  async close() {
    await promisify(this._server.close.bind(this._server))()
  }

  setNotFoundRequestHandler(requestHandler: RequestListener) {
    this._notFoundRequestHandler = requestHandler
  }

  _requestListener(request: IncomingMessage, response: ServerResponse): void {
    const url = new URL(request.url!, `${protocol}://${request.headers.host}`)
    const pathname = url.pathname
    if (this._requestHandlers.has(pathname)) {
      this._requestHandlers.get(url.pathname)!(request, response)
    } else {
      this._handleNotFound(request, response)
    }
  }

  _handleNotFound(request: IncomingMessage, response: ServerResponse) {
    response.writeHead(404)
    this._notFoundRequestHandler(request, response)
  }

  _onError(error: Error) {
    console.error('HTTPServer error', error)
  }
}
