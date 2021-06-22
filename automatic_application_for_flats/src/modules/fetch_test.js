process.env.NODE_ENV = "TESTING";

import path from "path";
import puppeteer from "puppeteer";

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

  let numberOfFlatOffers = 0;

  async function onFlatOffer(flatOffer) {
    console.log("Flat offer: ", flatOffer);
    numberOfFlatOffers++;
  }

  await fetchOnce(getBrowser, page, onFlatOffer);

  console.log("Number of flat offers: ", numberOfFlatOffers);
}

function run(fn) {
  fn().then(console.log, console.error);
}
