export async function type(form, selector, text) {
  const element = await form.$(selector);
  await element.type(text);
}
