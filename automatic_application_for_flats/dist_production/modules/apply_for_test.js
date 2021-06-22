"use strict";

var path__NAMESPACE__ = _interopRequireWildcard(require("path"));

var puppeteer__NAMESPACE__ = _interopRequireWildcard(require("puppeteer"));

var _config = require("../config.js");

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();
  _getRequireWildcardCache = function () {
    return cache;
  };
  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || (typeof obj !== "object" && typeof obj !== "function")) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache();
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}

process.env.NODE_ENV = "TESTING";
const path = path__NAMESPACE__.default || path__NAMESPACE__;
const puppeteer = puppeteer__NAMESPACE__.default || puppeteer__NAMESPACE__;
run(main);

async function main() {
  const moduleNameUnderTest = process.argv[2];
  const modulePathUnderTest = path.resolve(
    __dirname,
    moduleNameUnderTest,
    "applyForFlatOffer.js"
  );
  const { applyForFlatOffer } = await Promise.resolve(
    `${modulePathUnderTest}`
  ).then((s) => _interopRequireWildcard(require(s)));
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

  const url = process.argv[3];
  const flatOffer = {
    url,
  };
  await applyForFlatOffer(getBrowser, flatOffer, _config.contactData);
}

function run(fn) {
  fn().then(console.log, console.error);
}
//# sourceMappingURL=apply_for_test.js.map
