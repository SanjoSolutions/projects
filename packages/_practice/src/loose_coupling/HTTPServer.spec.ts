import request from "@sanjo/request";
import type { Server } from "http";
import http from "http";
import { HTTPServer } from "./HTTPServer.js";

describe("HTTP server", () => {
  describe("when no port has been passed", () => {
    it("listens on port 80 by default", async () => {
      const httpServerMock = ({
        on: jest.fn(),
        listen: jest.fn().mockImplementation((port, callback) => {
          callback();
        }),
        close: jest.fn(),
      } as unknown) as Server;
      jest.spyOn(http, "createServer").mockReturnValue(httpServerMock);
      const httpServer = new HTTPServer();
      await httpServer.listen();
      expect(httpServerMock.listen).toHaveBeenCalledWith(80, expect.anything());
    });
  });
});

// FIXME: Brittle?
describe.skip("HTTP server", () => {
  const port = 8082;

  async function requestToLocalhost(pathname: string) {
    return await request(`http://localhost:${port}${pathname}`);
  }

  let httpServer: HTTPServer;

  beforeEach(async function () {
    httpServer = new HTTPServer(port);
    await httpServer.listen();
  });

  afterEach(async function () {
    await httpServer.close();
  });

  it("serves pages over HTTP", async () => {
    httpServer.route("/", "Hello world!");
    httpServer.route("/2", "Hello world 2!");

    const response = await requestToLocalhost("/");
    expect(response).toMatchObject({
      status: 200,
      body: "Hello world!",
    });

    const response2 = await requestToLocalhost("/2");
    expect(response2).toMatchObject({
      status: 200,
      body: "Hello world 2!",
    });
  }, 30000);

  it("returns status code 404 when page not found", async () => {
    const response = await requestToLocalhost("/");
    expect(response).toMatchObject({
      status: 404,
    });
  });

  it("can return custom 404 response", async () => {
    httpServer.setNotFoundRequestHandler((request, response) => {
      response.end("Lollipop");
    });

    const response = await requestToLocalhost("/");
    expect(response).toMatchObject({
      status: 404,
      body: "Lollipop",
    });
  });

  it("can serve HTML pages", async () => {
    httpServer.route("/", "<div>Welcome</div>", "text/html");

    const response = await requestToLocalhost("/");
    expect(response).toMatchObject({
      status: 200,
      contentType: "text/html",
      body: "<div>Welcome</div>",
    });
  });
});
