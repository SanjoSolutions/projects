import { HTTPServer } from "./HTTPServer.js";
export declare class StaticHTTPServer extends HTTPServer {
    private _fileWatcher;
    constructor(directoryToServeFrom: string, port: number);
    close(): Promise<void>;
}
export declare function createStaticWebsiteServer(directoryToServeFrom: string, port: number): Promise<StaticHTTPServer>;
//# sourceMappingURL=createStaticWebsiteServer.d.ts.map