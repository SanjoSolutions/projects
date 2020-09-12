export function main() {
  const editor = createEditor()
  document.addEventListener(() => {
    document.body.appendChild(editor)
  })
}
