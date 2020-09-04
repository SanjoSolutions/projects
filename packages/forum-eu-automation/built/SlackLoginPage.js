"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _page;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlackLoginPage = void 0;
const puppeteer_helpers_1 = require("@sanjo/puppeteer-helpers");
class SlackLoginPage {
    constructor(page) {
        _page.set(this, void 0);
        __classPrivateFieldSet(this, _page, page);
    }
    async login(email, password) {
        await __classPrivateFieldGet(this, _page).type('#email', email);
        await __classPrivateFieldGet(this, _page).type('#password', password);
        await puppeteer_helpers_1.withWaitForNavigation(__classPrivateFieldGet(this, _page), __classPrivateFieldGet(this, _page).click('#signin_btn'));
    }
}
exports.SlackLoginPage = SlackLoginPage;
_page = new WeakMap();
//# sourceMappingURL=SlackLoginPage.js.map