"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var _page;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlackChannelPage = void 0;
class SlackChannelPage {
    constructor(page) {
        _page.set(this, void 0);
        __classPrivateFieldSet(this, _page, page);
    }
    async postMessage(message) {
    }
}
exports.SlackChannelPage = SlackChannelPage;
_page = new WeakMap();
//# sourceMappingURL=SlackChannelPage.js.map