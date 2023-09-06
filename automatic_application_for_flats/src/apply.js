import path from "path"
import puppeteer from "puppeteer"
import { contactData } from "./config.js"
import {
  registerFlatOfferAsAppliedTo,
  registerFlatOfferAsNotifiedOf,
} from "./core.js"
import { determineDirname } from "./lib/determineDirname.js"

const __dirname = determineDirname(import.meta.url)

run(main)

function getModuleName(url) {
  if (url.includes("immosuche")) {
    return "degewo"
  } else if (url.includes("gesobau")) {
    return "gesobau"
  } else if (url.includes("howoge")) {
    return "howoge"
  } else if (url.includes("gewobag")) {
    return "gewobag"
  } else if (url.includes("stadtundland")) {
    return "stadt_und_land"
  } else if (url.includes("wbm")) {
    return "wbm"
  } else {
    throw new Error(`Unknown module name for url "${url}".`)
  }
}

async function main() {
  const url = process.argv[2]
  const moduleName = getModuleName(url)
  const modulePathUnderTest = path.resolve(
    __dirname,
    "modules",
    moduleName,
    "applyForFlatOffer.js",
  )
  const { applyForFlatOffer } = await import(modulePathUnderTest)

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1024,
      height: 768,
    },
  })

  function getBrowser() {
    return browser
  }

  const flatOffer = { url }
  if (haveAppliedForFlatOffer(flatOffer)) {
    console.log("Have already applied for flat offer.")
  } else {
    await applyForFlatOffer(getBrowser, flatOffer, contactData)
    await registerFlatOfferAsAppliedTo(flatOffer)
  }
}

function run(fn) {
  fn().then(console.log, console.error)
}
