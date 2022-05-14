import chokidar from "chokidar";
import path, { extname } from "path";
import { createRoutes } from "./createRoutes.js";
import { extensionToContentType } from "./extensionToContentType.js";
import { HTTPServer } from "./HTTPServer.js";
import { readFile } from "./readFile.js";
export class StaticHTTPServer extends HTTPServer {
    _fileWatcher;
    constructor(directoryToServeFrom, port) {
        super(port);
        // TODO: Remove old route
        this._fileWatcher = chokidar
            .watch(directoryToServeFrom)
            .on("change", async (filePath) => {
            const content = await readFile(filePath);
            const contentType = extensionToContentType(extname(filePath));
            const subPath = path.relative(directoryToServeFrom, filePath);
            this.route("/" + subPath, content, contentType);
            if (subPath === "index.html") {
                this.route("/", content, contentType);
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