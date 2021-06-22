"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.saveScreenshotOfFlatOfferApplication = saveScreenshotOfFlatOfferApplication;

var _getScreenshotFilePath = require("./getScreenshotFilePath.js");

var _saveScreenshot = require("./saveScreenshot.js");

async function saveScreenshotOfFlatOfferApplication(page, flatOffer) {
  await (0, _saveScreenshot.saveScreenshot)(
    page,
    (0, _getScreenshotFilePath.getScreenshotFilePath)(flatOffer)
  );
}
//# sourceMappingURL=saveScreenshotOfFlatOfferApplication.js.map
