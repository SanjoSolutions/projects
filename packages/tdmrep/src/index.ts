export {}
;("/.well-known/tdmrep.json")

JSON.parse(content)

function retrieveTDMReservation(content: string): boolean {
  const tdmReservationRegExp =
    /<\s*[mM][eE][tT][aA]\s+[nN][aA][mM][eE]="tdm-reservation"\s*\/\s*>/g

  let lastTdmReservationElement = null
  while ((lastTdmReservationElement = tdmReservationRegExp.exec(content))) {}
  if (lastTdmReservationElement) {
    const text = lastTdmReservationElement[0]
    const match = /[cC][oO][nN][tT][eE][nN][tT]\s*=\s*(["'])[^\g1]*\g1/.exec(
      text,
    )
    if (match) {
      const value = match[2]
      const tdmReservation = value == "1"
      return tdmReservation
    }
  }

  return false
}
