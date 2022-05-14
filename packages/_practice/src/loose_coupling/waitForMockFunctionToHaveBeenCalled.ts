import type { Mock } from "jest-mock";
import { waitFor } from "./waitFor.js";

export async function waitForMockFunctionToHaveBeenCalled(mockFn: Mock<any>) {
  const condition = () => {
    return mockFn.mock.calls.length >= 1;
  };
  await waitFor(condition);
}
