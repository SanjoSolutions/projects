import { describe, it } from "@jest/globals";
import { createSendPixelsToServerPaket } from "./client.js";
import { littleEndian } from "./littleEndian.js";
import { pixelPaketToArray } from "./pixelPaketToArray.js";
import { pixelPaketEquals } from "./pixelsPaketEquals.js";

describe("client", () => {
  describe("createSendPixelsToServerPaket", () => {
    it("creates a paket for sending pixels to the server", () => {
      const pixels = [
        { x: 1, y: 2 },
        { x: 3, y: 4 },
      ];
      const paket = createSendPixelsToServerPaket(pixels);
      const expectedPaket = new ArrayBuffer(21);
      const expectedPaketView = new DataView(expectedPaket);
      expectedPaketView.setUint8(0, 0);
      expectedPaketView.setUint32(1, pixels.length, littleEndian);
      expectedPaketView.setInt32(5, 1, littleEndian);
      expectedPaketView.setInt32(9, 2, littleEndian);
      expectedPaketView.setInt32(13, 3, littleEndian);
      expectedPaketView.setInt32(17, 4, littleEndian);
      expect(pixelPaketToArray(paket)).toEqual(
        pixelPaketToArray(expectedPaket)
      );
    });
  });
});
