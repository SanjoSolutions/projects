"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.openPage = openPage;

async function openPage(getBrowser) {
  return await (await getBrowser()).newPage();
}
//# sourceMappingURL=openPage.js.map
