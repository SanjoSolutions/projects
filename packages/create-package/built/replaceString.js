"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceString = void 0;
const escape_for_reg_exp_1 = __importDefault(require("@sanjo/escape-for-reg-exp"));
function replaceString(text, stringToReplace, stringToReplaceWith) {
    return text.replace(new RegExp(escape_for_reg_exp_1.default(stringToReplace), 'g'), stringToReplaceWith);
}
exports.replaceString = replaceString;
//# sourceMappingURL=replaceString.js.map