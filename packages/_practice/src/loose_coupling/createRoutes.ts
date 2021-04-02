import type { StaticHTTPServer } from "./createStaticWebsiteServer";
import { readFiles } from "./readFiles";

export async function createRoutes(
  server: StaticHTTPServer,
  directoryToServeFrom: string
): Promise<void> {
  const files = await readFiles(directoryToServeFrom);
  for (const { pathname, contentType, content } of files) {
    server.route("/" + pathname, content, contentType);
    if (pathname === "index.html") {
      server.route("/", content, contentType);
    }
  }
}
