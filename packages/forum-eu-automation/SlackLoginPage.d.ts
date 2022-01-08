import type { Page } from "puppeteer";
export declare class SlackLoginPage {
    #private;
    constructor(page: Page);
    login(email: string, password: string): Promise<void>;
}
//# sourceMappingURL=SlackLoginPage.d.ts.map