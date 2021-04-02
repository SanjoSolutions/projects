import { wait } from "./wait";

export async function waitFor(condition) {
  while (!(await condition())) {
    await wait(1000);
  }
}
