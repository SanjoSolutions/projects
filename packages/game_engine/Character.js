import { GameObject } from './GameObject.js'
import { Sprite } from './Sprite.js'

export class Character extends GameObject {
  constructor () {
    super(
      {
        x: 0,
        y: 0,
        width: 32,
        height: 3 * 32,
      },
      new Sprite('images/sprites/man.png'),
    )
  }
}
