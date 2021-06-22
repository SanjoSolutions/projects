const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");
const { getWebServerPort } = require("../lib/testing/getWebServerPort.js");

module.exports = async function () {
  const webServerPort = await getWebServerPort();
  global.__WEB_SERVER__ = spawn(
    "python3",
    ["-m", "http.server", webServerPort],
    {
      cwd: path.resolve(__dirname, ".."),
    }
  );
  const logFile = await fs.createWriteStream(
    path.resolve(__dirname, "../../web_server.log"),
    { flags: "w" }
  );
  global.__WEB_SERVER__.stdout.pipe(logFile);
  global.__WEB_SERVER__.stderr.pipe(logFile);
};
