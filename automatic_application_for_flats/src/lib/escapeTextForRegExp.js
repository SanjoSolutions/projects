import { escapeCharacter } from './escapeCharacter.js'

export function escapeTextForRegExp(text) {
  return text.replace(/[()]/g, escapeCharacter)
}
