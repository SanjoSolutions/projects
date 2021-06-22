export async function acceptCookies(page) {
  const cookieBox = await page.$("#BorlabsCookieBox");
  if (
    await cookieBox.evaluate(
      (node) => node.children[0].style.display !== "none"
    )
  ) {
    const acceptCookiesButton = (await cookieBox.$$("._brlbs-accept"))[1];
    await acceptCookiesButton.click();
    await page.waitFor(1000);
  }
}
