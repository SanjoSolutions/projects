export function shiftBetween(a: any[], b: any[]): any[] {
  if (a.length === b.length + 1) {
    const result = []
    let indexA = 0
    let indexB = 0
    while (indexB < b.length) {
      result.push(a[indexA])
      indexA++
      result.push(b[indexB])
      indexB++
    }
    result.push(a[a.length - 1])
    return result
  } else {
    throw new Error("Expected: a.length === b.length + 1")
  }
}
