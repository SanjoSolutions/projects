export function hasFlag(flags: number, flag: number): boolean {
  return (flags & flag) === flag
}
