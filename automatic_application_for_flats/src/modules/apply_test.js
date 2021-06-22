process.env.NODE_ENV = "TESTING";

import path from "path";
import puppeteer from "puppeteer";
import { contactData } from "../config.js";

run(main);

async function main() {
  const moduleNameUnderTest = process.argv[2];
  const modulePathUnderTest = path.resolve(
    __dirname,
    moduleNameUnderTest,
    "index.js"
  );
  const { fetchOnce } = await import(modulePathUnderTest);

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1024,
      height: 768,
    },
  });

  function getBrowser() {
    return browser;
  }

  const page = await browser.newPage();

  let flatOffer = null;

  async function onFlatOffer(_flatOffer) {
    if (!flatOffer) {
      console.log("Flat offer: ", _flatOffer);
      flatOffer = _flatOffer;
    }
  }

  function shouldStop() {
    return Boolean(flatOffer);
  }

  await fetchOnce(getBrowser, page, onFlatOffer, shouldStop);

  if (flatOffer) {
    flatOffer.apply(getBrowser, contactData);
  }
}

function run(fn) {
  fn().then(console.log, console.error);
}
