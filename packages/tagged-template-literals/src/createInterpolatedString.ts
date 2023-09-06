import { shiftBetween } from "./shiftBetween.js"

export function createInterpolatedString(
  substrings: string[],
  ...args: any[]
): string {
  return shiftBetween(substrings, args).join("")
}
