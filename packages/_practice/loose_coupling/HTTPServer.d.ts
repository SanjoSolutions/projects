/// <reference types="node" />
import type { IncomingMessage, RequestListener, ServerResponse } from 'http';
export declare class HTTPServer {
    private _port;
    private _server;
    private _requestHandlers;
    private _notFoundRequestHandler;
    constructor(port?: number);
    route(pathname: string, responseText: string, contentType?: string | null): void;
    listen(): Promise<void>;
    close(): Promise<void>;
    setNotFoundRequestHandler(requestHandler: RequestListener): void;
    _requestListener(request: IncomingMessage, response: ServerResponse): void;
    _handleNotFound(request: IncomingMessage, response: ServerResponse): void;
    _onError(error: Error): void;
}
//# sourceMappingURL=HTTPServer.d.ts.map