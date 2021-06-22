"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.waitForNavigation = waitForNavigation;

async function waitForNavigation(page) {
  await page.waitForNavigation({
    waitUntil: "networkidle0",
  });
}
//# sourceMappingURL=waitForNavigation.js.map
