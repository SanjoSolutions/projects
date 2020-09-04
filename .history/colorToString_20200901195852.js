export function colorToString(color) {
  if (Array.isArray(color)) {
  } else {
    const { hue, saturation, lightness, alpha } = color
    if (alpha) {
      return `hsla(${Math.round(hue)}, ${Math.round(
        saturation * 100
      )}%, ${Math.round(lightness * 100)}%, ${alpha})`
    } else {
      return `hsl(${Math.round(hue)}, ${Math.round(
        saturation * 100
      )}%, ${Math.round(lightness * 100)}%)`
    }
  }
}
