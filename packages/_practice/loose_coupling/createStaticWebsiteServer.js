import fs from 'fs';
import path, { extname } from 'path';
import { createRoutes } from './createRoutes.js';
import { extensionToContentType } from './extensionToContentType.js';
import { HTTPServer } from './HTTPServer.js';
import { readFile } from './readFile.js';
export class StaticHTTPServer extends HTTPServer {
    _fileWatcher;
    constructor(directoryToServeFrom, port) {
        super(port);
        this._fileWatcher = fs.watch(directoryToServeFrom, { recursive: true }, async (eventType, fileName) => {
            const filePath = path.resolve(directoryToServeFrom, fileName);
            switch (eventType) {
                case 'rename':
                // TODO: Remove route old
                case 'change':
                    const content = await readFile(filePath);
                    const contentType = extensionToContentType(extname(fileName));
                    this.route('/' + fileName, content, contentType);
                    if (fileName === 'index.html') {
                        this.route('/', content, contentType);
                    }
                    break;
            }
        });
    }
    async close() {
        await super.close();
        this._fileWatcher.close();
    }
}
export async function createStaticWebsiteServer(directoryToServeFrom, port) {
    const server = new StaticHTTPServer(directoryToServeFrom, port);
    await createRoutes(server, directoryToServeFrom);
    await server.listen();
    return server;
}
//# sourceMappingURL=createStaticWebsiteServer.js.map