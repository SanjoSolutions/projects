import { waitFor } from "./waitFor";

export async function waitForMockFunctionToHaveBeenCalled(mockFn) {
  const condition = async () => {
    return mockFn.mock.calls.length >= 1;
  };
  await waitFor(condition);
}
