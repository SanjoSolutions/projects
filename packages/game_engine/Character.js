import { TILE_HEIGHT, TILE_WIDTH } from './config.js'
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
  }
}
