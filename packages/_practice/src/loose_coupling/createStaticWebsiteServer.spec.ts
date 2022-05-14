import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import { removeRecursively } from "@sanjo/fs";
import makeTemporaryDirectory from "@sanjo/make-temporary-directory";
import { generateRandomInteger } from "@sanjo/random";
import request from "@sanjo/request";
import type { ChildProcess } from "child_process";
import chokidar from "chokidar";
import fs from "fs";
import type { Mock } from "jest-mock";
import path, { resolve } from "path";
import {
  createStaticWebsiteServer,
  StaticHTTPServer,
} from "./createStaticWebsiteServer.js";
import { exec } from "./exec.js";
import { waitForMockFunctionToHaveBeenCalled } from "./waitForMockFunctionToHaveBeenCalled.js";
import { waitForUrl } from "./waitForUrl.js";
import { writeFile } from "./writeFile.js";

async function createStaticWebSite(directory: string): Promise<void> {
  await removeStaticWebSite(directory);
  await fs.promises.mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, "index.html"), "Welcome");
}

async function removeStaticWebSite(directory: string): Promise<void> {
  await removeRecursively(directory);
}

describe("createStaticWebsiteServer", () => {
  let directoryToServeFrom: string;
  let port: number;
  let server: StaticHTTPServer;

  jest.setTimeout(10000);

  beforeEach(async function () {
    directoryToServeFrom = await makeTemporaryDirectory();
    port = generateRandomInteger(8085, 8999 + 1);
    await createStaticWebSite(directoryToServeFrom);
  });

  afterEach(async function () {
    if (server) {
      await server.close();
    }
    await removeStaticWebSite(directoryToServeFrom);
  });

  it("serves a static website from a directory", async () => {
    server = await createStaticWebsiteServer(directoryToServeFrom, port);

    const response = await request(`http://localhost:${port}/`);

    expect(response).toMatchObject({
      status: 200,
      contentType: "text/html",
      body: expect.stringContaining("Welcome"),
    });
  });

  it("serves the up-to-date version of the content in the file", async () => {
    // FIXME: This test seems to be flaky.

    const onChangeSpy = mockChokidarOnChange();

    server = await createStaticWebsiteServer(directoryToServeFrom, port);

    const response = await request(`http://localhost:${port}/`);

    expect(response).toMatchObject({
      status: 200,
      contentType: "text/html",
      body: "Welcome",
    });

    onChangeSpy.mockClear();

    await writeFile(
      path.join(directoryToServeFrom, "index.html"),
      "Welcome world!"
    );

    await waitForMockFunctionToHaveBeenCalled(onChangeSpy);

    const response2 = await request(`http://localhost:${port}/`);

    expect(response2).toMatchObject({
      status: 200,
      contentType: "text/html",
      body: "Welcome world!",
    });
  }, 30000);
});

// FIXME: Brittle?
describe.skip("static website server CLI", () => {
  const directoryToServeFrom = resolve(__dirname, "test_files/static_website/");
  let server: ChildProcess;

  beforeEach(async function () {
    await createStaticWebSite(directoryToServeFrom);
  });

  afterEach(function () {
    if (server) {
      server.kill();
    }
  });

  it("can be started from CLI", async () => {
    const port = 8086;
    const scriptFilePath = `${path.resolve(
      directoryToServeFrom,
      path.resolve(__dirname, "static-website-server")
    )}`;
    server = await exec(`node ${scriptFilePath} ${port}`, {
      cwd: directoryToServeFrom,
    });
    const url = `http://localhost:${port}/`;
    await waitForUrl(url);

    const response = await request(url);

    expect(response).toMatchObject({
      status: 200,
      contentType: "text/html",
      body: "Welcome",
    });
  }, 30000);
});

type OnChangeListener = (filePath: string) => void;

function mockChokidarOnChange(): Mock<OnChangeListener> {
  const chokidarWatch = chokidar.watch;
  const onChangeSpy = jest.fn<OnChangeListener>();
  jest
    .spyOn(chokidar, "watch")
    .mockImplementation((directoryToServeFrom: any) => {
      console.log(directoryToServeFrom);
      const watcher = chokidarWatch.call(chokidar, directoryToServeFrom);
      const watcherOn = watcher.on;
      jest
        .spyOn(watcher, "on")
        .mockImplementation(function on(this: chokidar.FSWatcher, ...args) {
          const [event, listener] = args;
          if (event === "change") {
            watcherOn.call(this, event, function onChange(filePath) {
              console.log(filePath);
              onChangeSpy(filePath);
              listener(filePath);
            });
          } else {
            watcherOn.apply(this, args);
          }
          return watcher;
        });
      return watcher;
    });
  return onChangeSpy;
}
