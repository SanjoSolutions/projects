import { equalsApproximately } from "@sanjo/equals-approximately"

export interface Point {
  x: number
  y: number
}

export function isOnLine(a: Point, b: Point, p: Point, epsilon: number = 24) {
  if (b.x < a.x) {
    const t = a
    a = b
    b = t
  }

  return (
    p.x >= a.x &&
    p.x <= b.x &&
    equalsApproximately(
      p.y,
      ((b.y - a.y) / (b.x - a.x)) * (p.x - a.x) + a.y,
      epsilon,
    )
  )
}
