export async function openPage(getBrowser) {
  return await (await getBrowser()).newPage()
}
