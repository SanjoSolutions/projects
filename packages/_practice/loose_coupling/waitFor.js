import { wait } from './wait.js';
export async function waitFor(condition) {
    while (!(await condition())) {
        await wait(1000);
    }
}
//# sourceMappingURL=waitFor.js.map