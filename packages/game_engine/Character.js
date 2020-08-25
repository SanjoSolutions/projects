import { TILE_HEIGHT, TILE_WIDTH } from './config.js'
import { GameObject } from './GameObject.js'
import { Sprite } from './Sprite.js'

export class Character extends GameObject {
  constructor () {
    super(
      {
        x: 0,
        y: 0,
        width: TILE_WIDTH,
        height: 3 * TILE_HEIGHT,
      },
      new Sprite('images/sprites/man.png'),
    )
  }
}
