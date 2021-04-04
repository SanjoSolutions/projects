import { createStaticWebsiteServer } from "./createStaticWebsiteServer.js";

async function main() {
  const directoryToServeFrom = process.cwd();
  const port = parseInt(process.argv[2], 10);
  const server = await createStaticWebsiteServer(directoryToServeFrom, port);
  console.log("Static web server running.");
}

main().catch(console.error);
