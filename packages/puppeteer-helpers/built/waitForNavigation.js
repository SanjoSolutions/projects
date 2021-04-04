"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitForNavigation = void 0;
async function waitForNavigation(page) {
    return await page.waitForNavigation({ waitUntil: "networkidle0" });
}
exports.waitForNavigation = waitForNavigation;
//# sourceMappingURL=waitForNavigation.js.map