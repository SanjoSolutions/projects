import { equalsApproximately } from "@sanjo/equals-approximately"
import { GameObject } from "./GameObject.js"
import { Origin } from "./Origin.js"
import { Sprite } from "./Sprite.js"
import { TILE_HEIGHT, TILE_WIDTH } from "./config.js"

export class Character extends GameObject {
  constructor(map) {
    super(
      {
        x: 0,
        y: 0,
        width: TILE_WIDTH,
        height: 3 * TILE_HEIGHT,
      },
      new Sprite("images/sprites/man.png"),
    )
    this.origin = Origin.BottomCenter
    this.speed = { x: 0.03125, y: 0.03125 } // delta x and delta y per frame (~ 60 frames per second)
    this.waypoints = []
    this.x = 0.5 * map.width
    this.y = 0.5 * map.height + 2
  }

  moveForOneFrame() {
    if (this.waypoints.length >= 1) {
      const waypoint = this.waypoints[0]
      if (!equalsApproximately(this.x, waypoint.x, 0.5)) {
        const direction = waypoint.x > this.x ? 1 : -1
        this.x += direction * this.speed.x
      }
      if (!equalsApproximately(this.y, waypoint.y, 0.5)) {
        const direction = waypoint.y > this.y ? 1 : -1
        this.y += direction * this.speed.y
      }

      if (
        equalsApproximately(this.x, waypoint.x, 0.5) &&
        equalsApproximately(this.y, waypoint.y, 0.5)
      ) {
        this.waypoints.shift()
      }
    }
  }
}
