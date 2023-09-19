import { validate as validateEmail } from "email-validator"

const mailto = "mailto:"

export function checkSyntax(mailtoURI: string): void {
  if (!mailtoURI.startsWith(mailto)) {
    throw new Error('Mailto URIs start with "mailto:".')
  }
  const rest = mailtoURI.slice(mailto.length)
  if (!isValidEmailAddress(rest)) {
    throw new Error(`"${rest}" is an invalid email address.`)
  }
}

function isValidEmailAddress(emailAddress: string): boolean {
  return validateEmail(emailAddress)
}
