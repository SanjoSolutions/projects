import {
  type AnimatedSprite,
  Assets,
  type Container,
  type Resource,
  type Spritesheet,
  type Texture,
} from "pixi.js"
import { hasFlag } from "../../hasFlag.js"
import { Direction } from "../../shared/Direction.js"
import { createAnimatedSprite } from "./createAnimatedSprite.js"
import { createUniversalSpritesheet } from "./createUniversalSpritesheet.js"
import { Object } from "./Object.js"
import type { UniversalSpritesheet } from "./UniversalSpritesheet.js"

export class Character extends Object {
  static #hasSpritesheetsBeenLoaded: boolean = false
  static #bodySpritesheet: any | null = null
  static #headSpritesheet: any | null = null
  static #hairSpritesheet: any | null = null

  static async loadSpritesheets() {
    if (!Character.#hasSpritesheetsBeenLoaded) {
      Assets.add(
        "body",
        "assets/spritesheets/body/bodies/male/universal/light.png",
      )
      Assets.add(
        "head",
        "assets/spritesheets/head/heads/human_male/universal/light.png",
      )
      Assets.add("hair", "assets/spritesheets/hair/afro/male/black.png")
      const {
        body,
        head,
        hair,
      }: {
        body: Texture<Resource>
        head: Texture<Resource>
        hair: Texture<Resource>
        plants: Spritesheet
      } = (await Assets.load(["body", "head", "hair"])) as any

      Character.#bodySpritesheet = await createUniversalSpritesheet(
        "body",
        body,
      )
      Character.#headSpritesheet = await createUniversalSpritesheet(
        "head",
        head,
      )
      Character.#hairSpritesheet = await createUniversalSpritesheet(
        "hair",
        hair,
      )

      Character.#hasSpritesheetsBeenLoaded = true
    }
  }

  constructor(container: Container) {
    super(container)

    this._determineBodyTextures = this._determineBodyTextures.bind(this)
    this._determineHeadTextures = this._determineHeadTextures.bind(this)
    this._determineHairTextures = this._determineHairTextures.bind(this)

    this.sprite.addChild(
      createAnimatedSprite(Character.#bodySpritesheet.animations.down),
    )
    this.sprite.addChild(
      createAnimatedSprite(Character.#headSpritesheet.animations.down),
    )
    this.sprite.addChild(
      createAnimatedSprite(Character.#hairSpritesheet.animations.down),
    )
  }

  protected _updateTextures() {
    this._updateTexture(0, this._determineBodyTextures)
    this._updateTexture(1, this._determineHeadTextures)
    this._updateTexture(2, this._determineHairTextures)
  }

  private _updateTexture(
    index: number,
    determineTexture: () => Texture<Resource>[],
  ): void {
    const textures = determineTexture()
    const animatedSprite = this.sprite.children[index] as AnimatedSprite
    if (animatedSprite.textures !== textures) {
      animatedSprite.textures = textures
      if (this.isMoving) {
        animatedSprite.play()
      }
    }
    if (!this.isMoving) {
      animatedSprite.gotoAndStop(0)
    }
  }

  protected _play() {
    this.sprite.children.map((child) => (child as AnimatedSprite).play())
  }

  protected _stop() {
    this.sprite.children.map((child) => (child as AnimatedSprite).stop())
  }

  private _determineBodyTextures(): Texture<Resource>[] {
    return this._determineTexture(Character.#bodySpritesheet)
  }

  private _determineHeadTextures(): Texture<Resource>[] {
    return this._determineTexture(Character.#headSpritesheet)
  }

  private _determineHairTextures(): Texture<Resource>[] {
    return this._determineTexture(Character.#hairSpritesheet)
  }

  private _determineTexture(
    spritesheet: UniversalSpritesheet,
  ): Texture<Resource>[] {
    if (hasFlag(this.direction, Direction.Up)) {
      return spritesheet.animations.up
    } else if (hasFlag(this.direction, Direction.Down)) {
      return spritesheet.animations.down
    } else if (hasFlag(this.direction, Direction.Left)) {
      return spritesheet.animations.left
    } else if (hasFlag(this.direction, Direction.Right)) {
      return spritesheet.animations.right
    } else {
      return spritesheet.animations.down
    }
  }
}
