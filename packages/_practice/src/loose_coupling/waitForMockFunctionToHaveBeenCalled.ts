import { waitFor } from './waitFor.js'
import type { Mock } from 'jest-mock'

export async function waitForMockFunctionToHaveBeenCalled(mockFn: Mock<any>) {
  const condition = async () => {
    return mockFn.mock.calls.length >= 1
  }
  await waitFor(condition)
}
