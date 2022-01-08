import { createEditor } from './index.js'

export function main() {
  const editor = createEditor()
  document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(editor)
    editor.focus()
  })
}

main()
