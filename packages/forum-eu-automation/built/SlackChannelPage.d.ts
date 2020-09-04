import type { Page } from 'puppeteer';
export declare class SlackChannelPage {
    #private;
    constructor(page: Page);
    postMessage(message: string): Promise<void>;
}
//# sourceMappingURL=SlackChannelPage.d.ts.map