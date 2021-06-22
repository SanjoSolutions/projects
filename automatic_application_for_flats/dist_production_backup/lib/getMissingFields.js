"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.getMissingFields = getMissingFields;

function getMissingFields(requiredFields, object) {
  return requiredFields.filter(
    (requiredField) => !object.hasOwnProperty(requiredField)
  );
}
//# sourceMappingURL=getMissingFields.js.map
