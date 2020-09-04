"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escapeForRegExp = void 0;
/**
 * Source: https://stackoverflow.com/a/9310752/759971
 */
function escapeForRegExp(text) {
    return text.replace(/[\^\$\\\.\*\+\?\(\)\[\]\{\}\|]/g, '\\$&');
}
exports.escapeForRegExp = escapeForRegExp;
//# sourceMappingURL=escapeForRegExp.js.map