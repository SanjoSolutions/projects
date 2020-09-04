export function colorToString(color) {
  let hue, saturation, lightness, alpha
  if (Array.isArray(color)) {
  } else {
    const { hue, saturation, lightness, alpha } = color
    hue = hue / 360
  }
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
