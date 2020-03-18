export async function wait (howLongInMs) {
  return new Promise(resolve => setTimeout(resolve, howLongInMs))
}
