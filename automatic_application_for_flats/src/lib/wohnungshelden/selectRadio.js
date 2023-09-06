export async function selectRadio(
  { form, page },
  elementOrSelector,
  optionIndex,
) {
  const radioGroup =
    typeof elementOrSelector === "string"
      ? await form.$(elementOrSelector)
      : elementOrSelector
  await radioGroup.evaluate(
    (node, optionIndex) => node.children[optionIndex].click(),
    optionIndex,
  )
}
