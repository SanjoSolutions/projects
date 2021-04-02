/**
 * Creates look-up from parsed CSV.
 * Rows without string values are ignored.
 * @param csv {any[][]} CSV as array of rows. Each row is an array.
 * @returns {Map<string, string>}
 */
export function createLookUpFromCsv(csv) {
  return new Map(
    csv
      .map((row) => ({ stringValue: row[2], keyConstant: row[1] }))
      .filter(({ stringValue }) => stringValue)
      .map(({ stringValue, keyConstant }) => [stringValue, keyConstant])
  )
}
