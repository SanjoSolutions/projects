export function colorToString(color) {
  if (Array.isArray(color)) {
    color = {
      hue: color[0],
      saturation: color[1],
      lightness: color[2],
      alpha: color[3],
    }
  } else {
    color = { ...color, hue: color.hue / 360 }
  }
  const { hue, saturation, lightness, alpha } = color
  if (alpha) {
    return `hsla(${Math.round(hue * 360)}, ${Math.round(
      saturation * 100,
    )}%, ${Math.round(lightness * 100)}%, ${alpha})`
  } else {
    return `hsl(${Math.round(hue * 360)}, ${Math.round(
      saturation * 100,
    )}%, ${Math.round(lightness * 100)}%)`
  }
}
