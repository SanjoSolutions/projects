import { fileURLToPath } from "url"

export function __filename(importUrl: string): string {
  return fileURLToPath(importUrl)
}
