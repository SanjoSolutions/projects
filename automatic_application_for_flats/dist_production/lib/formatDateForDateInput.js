"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.formatDateForDateInput = formatDateForDateInput;

function formatDateForDateInput(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
}
//# sourceMappingURL=formatDateForDateInput.js.map
