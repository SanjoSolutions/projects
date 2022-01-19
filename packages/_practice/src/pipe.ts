function passValueToFunction(value: any, fn: (value: any) => any) {
  return fn(value)
}

export function pipe(value: any, ...functions: ((value: any) => any)[]) {
  return functions.reduce(passValueToFunction, value)
}
