export async function submitForm (form) {
  await form.evaluate(form => {
    form.submit()
  })
}
