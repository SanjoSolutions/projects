import { readFiles } from './readFiles.js';
export async function createRoutes(server, directoryToServeFrom) {
    const files = await readFiles(directoryToServeFrom);
    for (const { pathname, contentType, content } of files) {
        server.route('/' + pathname, content, contentType);
        if (pathname === 'index.html') {
            server.route('/', content, contentType);
        }
    }
}
//# sourceMappingURL=createRoutes.js.map