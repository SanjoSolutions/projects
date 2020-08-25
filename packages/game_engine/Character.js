import { TILE_HEIGHT, TILE_WIDTH } from './config.js'
import { equalsApproximately } from './equalsApproximately.js'
import { GameObject } from './GameObject.js'
import { bottomCenter } from './originHelpers/bottomCenter.js'
import { Sprite } from './Sprite.js'

export class Character extends GameObject {
  constructor (map) {
    super(
      {
        x: 0.5 * map.calculateWidthInPixels(),
        y: 0.5 * map.calculateHeightInPixels() + 2 * map.tileHeight,
        width: TILE_WIDTH,
        height: 3 * TILE_HEIGHT,
      },
      new Sprite('images/sprites/man.png'),
    )
    this.origin = bottomCenter(this.boundingBox)
    this.speed = { x: 0.5, y: 0.5 } // delta x and delta y per frame (~ 60 frames per second)
    this.waypoints = []
  }

  moveForOneFrame () {
    if (this.waypoints.length >= 1) {
      const waypoint = this.waypoints[0]
      if (!equalsApproximately(this.boundingBox.x, waypoint.x, 1)) {
        const direction = waypoint.x > this.boundingBox.x ? 1 : -1
        this.boundingBox.x += direction * this.speed.x
      }
      if (!equalsApproximately(this.boundingBox.y, waypoint.y, 1)) {
        const direction = waypoint.y > this.boundingBox.y ? 1 : -1
        this.boundingBox.y += direction * this.speed.y
      }

      if (
        equalsApproximately(this.boundingBox.x, waypoint.x, 1) &&
        equalsApproximately(this.boundingBox.y, waypoint.y, 1)
      ) {
        this.waypoints.shift()
      }
    }
  }
}

