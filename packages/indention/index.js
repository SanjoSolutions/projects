export function indent(text) {
  return text.split(/(?:\n|\r\n|\r)/).map(indentLine).join('\n')
}

function indentLine(line) {
  return `  ${line}`
}
