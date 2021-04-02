export function humanToCamelCase(string) {
  const words = string.split(" ")
  return (
    words[0] +
    words.slice(1).map(function capitalizeFirstLetter(word) {
      return word[0].toUpperCase() + word.substring(1)
    })
  )
}
