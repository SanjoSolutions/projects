import { waitFor } from "./waitFor.js";
export async function waitForMockFunctionToHaveBeenCalled(mockFn) {
    const condition = () => {
        return mockFn.mock.calls.length >= 1;
    };
    await waitFor(condition);
}
//# sourceMappingURL=waitForMockFunctionToHaveBeenCalled.js.map