import { createBrowser } from "../../lib/createBrowser.js";
import { getUrl } from "../../lib/testing/getUrl.js";
import { DegewoFlatOfferListElement } from "./DegewoFlatOfferListElement.js";
import { createFlatOfferElement } from "./fixtures/createFlatOfferElement.js";
import { createSeniorsOnlyFlatOfferElement } from "./fixtures/createSeniorsOnlyFlatOfferElement.js";

let browser;

beforeAll(async () => {
  browser = await createBrowser();
});

afterAll(async () => {
  await browser.close();
});

describe("DegewoFlatOfferListElement", () => {
  describe("getUrl", () => {
    it("returns the url of the flat offer detail page", async () => {
      const page = await browser.newPage();
      await page.goto(
        await getUrl("/modules/degewo/fixtures/degewo_flat_offer_element.html")
      );
      const flatOfferElement = new DegewoFlatOfferListElement(
        await page.$("article")
      );
      const url = await flatOfferElement.getUrl();

      expect(url).toEqual("http://0.0.0.0:8888/de/properties/1400-40137-0270");
    });
  });

  describe("getColdRent", () => {
    it("returns the cold rent as float", async () => {
      const element = new DegewoFlatOfferListElement(
        await createFlatOfferElement(browser)
      );

      const coldRent = await element.getColdRent();

      expect(coldRent).toEqual(178.06);
    });
  });

  describe("getSeniorsOnly", () => {
    it("returns true when for seniors only", async () => {
      const element = new DegewoFlatOfferListElement(
        await createSeniorsOnlyFlatOfferElement(browser)
      );

      const seniorsOnly = await element.getSeniorsOnly();

      expect(seniorsOnly).toEqual(true);
    });

    it("returns false when not for seniors only", async () => {
      const element = new DegewoFlatOfferListElement(
        await createFlatOfferElement(browser)
      );

      const seniorsOnly = await element.getSeniorsOnly();

      expect(seniorsOnly).toEqual(false);
    });
  });

  describe("getRequiredMinimumAge", () => {
    it("returns the required minimum age when in the title", async () => {
      const element = new DegewoFlatOfferListElement(
        await createSeniorsOnlyFlatOfferElement(browser)
      );

      const requiredMinimumAge = await element.getRequiredMinimumAge();

      expect(requiredMinimumAge).toEqual(60);
    });

    it("returns null when minimum age not in the title", async () => {
      const element = new DegewoFlatOfferListElement(
        await createFlatOfferElement(browser)
      );

      const requiredMinimumAge = await element.getRequiredMinimumAge();

      expect(requiredMinimumAge).toBeNull();
    });
  });
});
