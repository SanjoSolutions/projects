export function bottomCenter (boundingBox) {
  return {
    x: 0.5 * boundingBox.width,
    y: boundingBox.height,
  }
}
