import { wait } from "./wait.js"

export async function waitFor(
  condition: () => boolean | Promise<boolean>,
): Promise<void> {
  while (!(await condition())) {
    await wait(1000)
  }
}
