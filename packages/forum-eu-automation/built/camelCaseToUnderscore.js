"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.camelCaseToUnderscore = void 0;
function camelCaseToUnderscore(string) {
    return string.replace(/[A-Z]/g, "_$&").toLowerCase();
}
exports.camelCaseToUnderscore = camelCaseToUnderscore;
//# sourceMappingURL=camelCaseToUnderscore.js.map