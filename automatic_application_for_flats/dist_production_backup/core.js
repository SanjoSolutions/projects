"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.verifyContactData = verifyContactData;
exports.process = process;
exports.getFlatOfferFetchers = getFlatOfferFetchers;
exports.isAFlatWeCanApplyFor = isAFlatWeCanApplyFor;
exports.registerFlatOfferAsAppliedTo = registerFlatOfferAsAppliedTo;

var _fs = require("fs");

var path__NAMESPACE__ = _interopRequireWildcard(require("path"));

var _getMissingFields = require("./lib/getMissingFields.js");

var _isBoolean = require("./lib/isBoolean.js");

var _isNumber = require("./lib/isNumber.js");

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

const path = path__NAMESPACE__.default || path__NAMESPACE__;
const modulesDirectoryName = "modules";
const modulesPath = path.join(__dirname, modulesDirectoryName);

function verifyContactData(contactData) {
  const minimumRequiredFields = [
    "title",
    "firstName",
    "lastName",
    "email",
    "phone",
    "address",
    "applicationMessage",
    "numberOfAdults",
    "numberOfChildren",
    "monthlyIncome",
    "earliestDateToMoveIn",
    "wbs",
    "hasPets",
    "threatenedByLossOfHousing",
    "firstTimeHousehold",
    "mBill",
  ];
  const missingRequiredFields = (0, _getMissingFields.getMissingFields)(
    minimumRequiredFields,
    contactData
  );

  if (missingRequiredFields.length >= 1) {
    throw new Error(
      `Missing required fields in contact data: ${missingRequiredFields.join(
        ", "
      )}`
    );
  }
}

async function process(
  getBrowser,
  flatOfferFetchers,
  { intervalBetweenProcessRuns, contactData, shouldStop }
) {
  console.log("Fetching flat offers...");
  await fetchFlatOffers(
    getBrowser,
    intervalBetweenProcessRuns,
    flatOfferFetchers,
    onFlatOffer.bind(null, getBrowser, contactData),
    shouldStop
  );
}

async function onFlatOffer(getBrowser, contactData, flatOffer) {
  if (
    !haveAppliedForFlatOffer(flatOffer) &&
    isAFlatWeCanApplyFor(contactData, flatOffer)
  ) {
    await apply(getBrowser, contactData, flatOffer);
  }
}

async function getFlatOfferFetchers() {
  const flatOfferFetchers = [];

  for (const fileName of await _fs.promises.readdir(modulesPath)) {
    let filePath = path.join(modulesPath, fileName);
    let stats = await _fs.promises.stat(filePath);

    if (stats.isDirectory()) {
      filePath = path.join(filePath, "index.js");
      stats = await _fs.promises.stat(filePath);
    }

    if (
      isJavaScriptFile(filePath) &&
      !path.basename(fileName).startsWith("_") &&
      !path.basename(fileName, path.extname(fileName)).endsWith("_test")
    ) {
      if (stats.isFile()) {
        const module = require(filePath);

        const fetcher = module.fetch;

        if (!fetcher) {
          throw new Error(
            `Module "${filePath}" has no expected export "fetch".`
          );
        }

        if (typeof fetcher !== "function") {
          throw new Error(
            `Module "${filePath}" export "fetch" has not the expected type "function".`
          );
        }

        flatOfferFetchers.push(fetcher);
      }
    }
  }

  return flatOfferFetchers;
}

async function fetchFlatOffers(
  getBrowser,
  intervalBetweenProcessRuns,
  flatOfferFetchers,
  onFlatOffer,
  shouldStop
) {
  for (const fetch of flatOfferFetchers) {
    try {
      await fetch(
        getBrowser,
        intervalBetweenProcessRuns,
        onFlatOffer,
        shouldStop
      );
    } catch (error) {
      console.error(error);
    }
  }
} // TODO: Needs unit tests

function isAFlatWeCanApplyFor(contactData, flatOffer) {
  const maxColdRentPlusColdServiceCharges = 463.65;
  const maxWarmServiceCharges = 76.5;
  const monthlyIncome = 986.15;
  /* AG2 */

  return (
    (((0, _isNumber.isNumber)(flatOffer.coldRent) &&
      (0, _isNumber.isNumber)(flatOffer.coldServiceCharges) &&
      (0, _isNumber.isNumber)(flatOffer.warmServiceCharges) &&
      flatOffer.coldRent + flatOffer.coldServiceCharges <=
        maxColdRentPlusColdServiceCharges &&
      flatOffer.warmServiceCharges <= maxWarmServiceCharges) ||
      ((0, _isNumber.isNumber)(flatOffer.warmRent) &&
        flatOffer.warmRent <=
          maxColdRentPlusColdServiceCharges + maxWarmServiceCharges) ||
      ((0, _isNumber.isNumber)(flatOffer.coldRent) &&
        (0, _isNumber.isNumber)(flatOffer.serviceCharges) &&
        flatOffer.coldRent + flatOffer.serviceCharges <=
          maxColdRentPlusColdServiceCharges + maxWarmServiceCharges)) &&
    forPeopleOfAge(flatOffer, 30) &&
    flatOffer.area <= 50 && // m ** 2
    flatOffer.numberOfRooms <= 2 &&
    ((!flatOffer.url.includes("howoge") && !flatOffer.url.includes("degewo")) ||
      monthlyIncome >= 3 * totalRent(flatOffer)) && // Haushaltsnettoeinkommen >= 3 * Gesamtmiete
    (!(0, _isBoolean.isBoolean)(flatOffer.selfRenovation) ||
      flatOffer.selfRenovation === Boolean(contactData.selfRenovation))
  );
}

function totalRent(flatOffer) {
  if (
    (0, _isNumber.isNumber)(flatOffer.coldRent) &&
    (0, _isNumber.isNumber)(flatOffer.coldServiceCharges) &&
    (0, _isNumber.isNumber)(flatOffer.warmServiceCharges)
  ) {
    return (
      flatOffer.coldRent +
      flatOffer.coldServiceCharges +
      flatOffer.warmServiceCharges
    );
  } else if ((0, _isNumber.isNumber)(flatOffer.warmRent)) {
    return flatOffer.warmRent;
  } else if (
    (0, _isNumber.isNumber)(flatOffer.coldRent) &&
    (0, _isNumber.isNumber)(flatOffer.serviceCharges)
  ) {
    return flatOffer.coldRent + flatOffer.serviceCharges;
  }
}

function forPeopleOfAge(flatOffer, age) {
  return (
    !isFlatOfferForSeniorsOnly(flatOffer) &&
    (typeof flatOffer.requiredMinimumAge !== "number" ||
      age >= flatOffer.requiredMinimumAge)
  );
}

function isFlatOfferForSeniorsOnly(flatOffer) {
  return Boolean(flatOffer.seniorsOnly);
}

async function apply(getBrowser, contactData, flatOffer) {
  console.log("Flat offer that can be applied to: " + flatOffer.url);
  /*
  if (typeof flatOffer.apply === 'function') {
    console.log('Applying for flat offer: ', flatOffer)
    await flatOffer.apply(getBrowser, contactData)
  } else {
    console.log('Sending notification for flat offer: ', flatOffer)
    await notify(flatOffer, contactData)
  }
  */

  /*
  console.log('Sending notification for flat offer: ', flatOffer)
  await notify(flatOffer, contactData)
  */

  /*
   * await registerFlatOfferAsAppliedTo(flatOffer)
   */
} // IMPROVEMENT: Structure code of haveAppliedForFlatOffer and registerFlatOfferAsAppliedTo like fetchedFlatOffers.js
// IMPROVEMENT: Save flatOffer data for manual validation (like it is done for fetchedFlatOffers.json)

function haveAppliedForFlatOffer(flatOffer) {
  // FIXME: User readJSON instead of require
  const flatOffersAppliedTo = require("../flatOffersAppliedTo.json");

  return flatOffersAppliedTo.includes(flatOffer.url);
}

async function registerFlatOfferAsAppliedTo(flatOffer) {
  // FIXME: User readJSON instead of require
  const flatOffersAppliedTo = require("../flatOffersAppliedTo.json");

  flatOffersAppliedTo.push(flatOffer.url);
  await _fs.promises.writeFile(
    path.resolve(__dirname, "..", "flatOffersAppliedTo.json"),
    JSON.stringify(flatOffersAppliedTo, null, 2)
  );
}

function isJavaScriptFile(filePath) {
  return [".js", ".mjs", ".cjs"].includes(path.extname(filePath));
}
//# sourceMappingURL=core.js.map
