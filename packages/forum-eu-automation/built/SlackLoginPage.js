"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlackLoginPage = void 0;
const puppeteer_helpers_1 = require("@sanjo/puppeteer-helpers");
class SlackLoginPage {
    constructor(page) {
        this.#page = page;
    }
    #page;
    async login(email, password) {
        await this.#page.type("#email", email);
        await this.#page.type("#password", password);
        await puppeteer_helpers_1.withWaitForNavigation(this.#page, this.#page.click("#signin_btn"));
    }
}
exports.SlackLoginPage = SlackLoginPage;
//# sourceMappingURL=SlackLoginPage.js.map