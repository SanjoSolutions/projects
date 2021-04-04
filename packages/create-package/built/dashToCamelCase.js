"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashToCamelCase = void 0;
function dashToCamelCase(string) {
    const parts = string.split("-");
    return [parts[0]]
        .concat(parts
        .slice(1)
        .map((string) => string[0].toUpperCase() + string.substring(1)))
        .join("");
}
exports.dashToCamelCase = dashToCamelCase;
//# sourceMappingURL=dashToCamelCase.js.map