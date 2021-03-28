/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes red, green, and blue are contained in the set [0, 255] and
 * returns hue, saturation, and lightness in the set [0, 1].
 *
 * Source: https://stackoverflow.com/a/9493060/759971
 * License: https://stackoverflow.com/help/licensing
 * The code has been modified.
 * License for modifications: https://creativecommons.org/licenses/by-sa/4.0/
 *
 * @param   {number}  red     The red color value
 * @param   {number}  green   The green color value
 * @param   {number}  blue    The blue color value
 * @return  {Array}           The HSL representation
 */
export function rgbToHsl(red, green, blue) {
  red /= 255
  green /= 255
  blue /= 255
  const max = Math.max(red, green, blue)
  const min = Math.min(red, green, blue)
  let hue
  let saturation
  const lightness = (max + min) / 2

  if (max == min) {
    hue = saturation = 0 // achromatic
  } else {
    var d = max - min
    saturation = lightness > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case red:
        hue = (green - blue) / d + (green < blue ? 6 : 0)
        break
      case green:
        hue = (blue - red) / d + 2
        break
      case blue:
        hue = (red - green) / d + 4
        break
    }
    hue /= 6
  }

  return [hue, saturation, lightness]
}
