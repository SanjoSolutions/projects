export function isTitleOfSeniorsOnlyFlat(title) {
  return (
    title.includes("Senioren") ||
    title.includes("ältere Generation") ||
    title.includes("Senior") ||
    title.includes("55+") ||
    title.includes("ab 60 Jahren")
  )
}
