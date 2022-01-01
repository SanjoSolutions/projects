import { dirname } from "path";
import { __filename } from "./__filename.js";

export function __dirname(importUrl: string): string {
  return dirname(__filename(importUrl));
}
