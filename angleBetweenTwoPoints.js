export function angleBetweenTwoPoints(a, b) {
  return Math.atan2(b.y - a.y, b.x - a.x);
}
