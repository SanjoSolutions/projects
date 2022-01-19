import http from 'http';
import { URL } from 'url';
import { promisify } from 'util';
const protocol = 'http';
function createDefaultRequestHandler(responseText, contentType = null) {
    return function defaultRequestHandler(request, response) {
        if (contentType) {
            response.setHeader('content-type', contentType);
        }
        response.writeHead(200);
        response.end(responseText);
    };
}
function notFoundRequestHandler(request, response) {
    response.end();
}
export class HTTPServer {
    _port;
    _server;
    _requestHandlers;
    _notFoundRequestHandler;
    constructor(port = 80) {
        this._port = port;
        this._requestListener = this._requestListener.bind(this);
        this._onError = this._onError.bind(this);
        this._server = http.createServer(this._requestListener);
        this._server.on('error', this._onError);
        this._requestHandlers = new Map();
        this._notFoundRequestHandler = notFoundRequestHandler;
    }
    route(pathname, responseText, contentType = null) {
        this._requestHandlers.set(pathname, createDefaultRequestHandler(responseText, contentType));
    }
    listen() {
        return new Promise((resolve, reject) => {
            const onListening = () => {
                this._server.off('error', onError);
                resolve();
            };
            const onError = (error) => {
                this._server.off('listening', onListening);
                reject(error);
            };
            this._server.once('listening', onListening);
            this._server.once('error', onError);
            this._server.listen(this._port);
        });
    }
    async close() {
        await promisify(this._server.close.bind(this._server))();
    }
    setNotFoundRequestHandler(requestHandler) {
        this._notFoundRequestHandler = requestHandler;
    }
    _requestListener(request, response) {
        const url = new URL(request.url, `${protocol}://${request.headers.host}`);
        const pathname = url.pathname;
        if (this._requestHandlers.has(pathname)) {
            this._requestHandlers.get(url.pathname)(request, response);
        }
        else {
            this._handleNotFound(request, response);
        }
    }
    _handleNotFound(request, response) {
        response.writeHead(404);
        this._notFoundRequestHandler(request, response);
    }
    _onError(error) {
        console.error('HTTPServer error', error);
    }
}
//# sourceMappingURL=HTTPServer.js.map