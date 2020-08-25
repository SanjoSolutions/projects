import { GameObject } from './GameObject.js'
import { Sprite } from './Sprite.js'

export class House extends GameObject {
  constructor () {
    const width = 3 * 32
    const height = 3 * 32
    super(
      {
        x: 0.5 * 20 * 32 - 0.5 * width,
        y: 0.5 * 12 * 32 - 0.5 * height,
        width,
        height,
      },
      new Sprite('images/sprites/house.png'),
    )
  }
}
