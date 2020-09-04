"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertObjectPropertyNamesFromCamelCaseToUnderscore = void 0;
const camelCaseToUnderscore_1 = require("./camelCaseToUnderscore");
function convertObjectPropertyNamesFromCamelCaseToUnderscore(data) {
    return Object.fromEntries(Object.entries(data)
        .map(([propertyName, propertyValue]) => [
        camelCaseToUnderscore_1.camelCaseToUnderscore(propertyName),
        propertyValue,
    ]));
}
exports.convertObjectPropertyNamesFromCamelCaseToUnderscore = convertObjectPropertyNamesFromCamelCaseToUnderscore;
//# sourceMappingURL=convertObjectPropertyNamesFromCamelCaseToUnderscore.js.map