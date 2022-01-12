import { waitForNavigation } from './waitForNavigation.js';
export async function withWaitForNavigation(page, ...promises) {
    await Promise.all([waitForNavigation(page), ...promises]);
}
//# sourceMappingURL=withWaitForNavigation.js.map