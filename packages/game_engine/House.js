import { TILE_HEIGHT, TILE_WIDTH } from "./config.js"
import { GameObject } from "./GameObject.js"
import { Sprite } from "./Sprite.js"

export class House extends GameObject {
  constructor() {
    const width = 3 * TILE_WIDTH
    const height = 3 * TILE_HEIGHT
    super(
      {
        x: 0.5 * 20 * TILE_WIDTH - 0.5 * width,
        y: 0.5 * 12 * TILE_HEIGHT - 0.5 * height,
        width,
        height,
      },
      new Sprite("images/sprites/house.png")
    )
  }
}
