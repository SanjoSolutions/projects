import type { Spritesheet, Texture } from "pixi.js"

export interface UniversalSpritesheet extends Spritesheet {
  animations: {
    up: Texture[]
    down: Texture[]
    left: Texture[]
    right: Texture[]
  }
}
