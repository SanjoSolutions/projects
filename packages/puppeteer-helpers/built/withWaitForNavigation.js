"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withWaitForNavigation = void 0;
const waitForNavigation_1 = require("./waitForNavigation");
async function withWaitForNavigation(page, ...promises) {
    await Promise.all([waitForNavigation_1.waitForNavigation(page), ...promises]);
}
exports.withWaitForNavigation = withWaitForNavigation;
//# sourceMappingURL=withWaitForNavigation.js.map