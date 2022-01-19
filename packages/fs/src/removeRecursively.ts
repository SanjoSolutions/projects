import type { PathLike } from 'fs'
import fs from 'fs/promises'

export async function removeRecursively(path: PathLike, options?: RemoveRecursivelyOptions): Promise<void> {
  await fs.rm(path, {
    maxRetries: 3,
    ...options,
    recursive: true,
  })
}

/**
 * Based on https://github.com/DefinitelyTyped/DefinitelyTyped/blob/2c43e7005fc8c967825f1c163b9c3c8dad619c25/types/node/fs.d.ts#L1438.
 * @license https://github.com/DefinitelyTyped/DefinitelyTyped/blob/2c43e7005fc8c967825f1c163b9c3c8dad619c25/LICENSE
 */
export interface RemoveRecursivelyOptions {
  /**
   * When `true`, exceptions will be ignored if `path` does not exist.
   * @default false
   */
  force?: boolean | undefined
  /**
   * If an `EBUSY`, `EMFILE`, `ENFILE`, `ENOTEMPTY`, or
   * `EPERM` error is encountered, Node.js will retry the operation with a linear
   * backoff wait of `retryDelay` ms longer on each try. This option represents the
   * number of retries. This option is ignored if the `recursive` option is not
   * `true`.
   * @default 3
   */
  maxRetries?: number | undefined
  /**
   * The amount of time in milliseconds to wait between retries.
   * This option is ignored if the `recursive` option is not `true`.
   * @default 100
   */
  retryDelay?: number | undefined
}
