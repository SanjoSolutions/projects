"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestJSON = void 0;
const request_1 = __importDefault(require("@sanjo/request"));
async function requestJSON(url, options = {}, data) {
    const body = data ? JSON.stringify(data) : undefined;
    const response = await request_1.default(url, options, body);
    return JSON.parse(response.body);
}
exports.requestJSON = requestJSON;
//# sourceMappingURL=requestJSON.js.map