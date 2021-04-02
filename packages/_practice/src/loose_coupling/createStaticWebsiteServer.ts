import type { FSWatcher } from "fs";
import fs from "fs";
import path, { extname } from "path";
import { createRoutes } from "./createRoutes";
import { extensionToContentType } from "./extensionToContentType";
import { HTTPServer } from "./HTTPServer";
import { readFile } from "./readFile";

export class StaticHTTPServer extends HTTPServer {
  private _fileWatcher: FSWatcher;

  constructor(directoryToServeFrom: string, port: number) {
    super(port);

    this._fileWatcher = fs.watch(
      directoryToServeFrom,
      { recursive: true },
      async (eventType, fileName) => {
        const filePath = path.resolve(directoryToServeFrom, fileName);
        switch (eventType) {
          case "rename":
          // TODO: Remove route old
          case "change":
            const content = await readFile(filePath);
            const contentType = extensionToContentType(extname(fileName));
            this.route("/" + fileName, content, contentType);
            if (fileName === "index.html") {
              this.route("/", content, contentType);
            }
            break;
        }
      }
    );
  }

  async close() {
    await super.close();
    this._fileWatcher.close();
  }
}

export async function createStaticWebsiteServer(
  directoryToServeFrom: string,
  port: number
): Promise<StaticHTTPServer> {
  const server = new StaticHTTPServer(directoryToServeFrom, port);
  await createRoutes(server, directoryToServeFrom);
  await server.listen();
  return server;
}
