import { equalsApproximately } from './equalsApproximately.js';

export function isOnLine(a, b, p) {
  if (b.x < a.x) {
    const t = a
    a = b
    b = t
  }

  return (
    p.x >= a.x &&
    p.x <= b.x &&
    equalsApproximately(p.y, ((b.y - a.y) / (b.x - a.x)) * (p.x - a.x) + a.y, 24)
  )
}
