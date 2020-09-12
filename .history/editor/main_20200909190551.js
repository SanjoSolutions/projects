import { createEditor } from 'index.js';

export function main() {
  const editor = createEditor()
  document.addEventListener(() => {
    document.body.appendChild(editor)
  })
}

main()
