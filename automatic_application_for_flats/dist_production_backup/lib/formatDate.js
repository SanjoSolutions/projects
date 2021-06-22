"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.formatDate = formatDate;

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}
//# sourceMappingURL=formatDate.js.map
