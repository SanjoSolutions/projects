import { Assets, } from "pixi.js";
import { hasFlag } from "../../hasFlag.js";
import { Direction } from "../../shared/Direction.js";
import { createAnimatedSprite } from "./createAnimatedSprite.js";
import { createUniversalSpritesheet } from "./createUniversalSpritesheet.js";
import { Object } from "./Object.js";
export class Character extends Object {
    static #hasSpritesheetsBeenLoaded = false;
    static #bodySpritesheet = null;
    static #headSpritesheet = null;
    static #hairSpritesheet = null;
    static async loadSpritesheets() {
        if (!Character.#hasSpritesheetsBeenLoaded) {
            Assets.add("body", "assets/spritesheets/body/bodies/male/universal/light.png");
            Assets.add("head", "assets/spritesheets/head/heads/human_male/universal/light.png");
            Assets.add("hair", "assets/spritesheets/hair/afro/male/black.png");
            const { body, head, hair, } = (await Assets.load(["body", "head", "hair"]));
            Character.#bodySpritesheet = await createUniversalSpritesheet("body", body);
            Character.#headSpritesheet = await createUniversalSpritesheet("head", head);
            Character.#hairSpritesheet = await createUniversalSpritesheet("hair", hair);
            Character.#hasSpritesheetsBeenLoaded = true;
        }
    }
    constructor(container) {
        super(container);
        this._determineBodyTextures = this._determineBodyTextures.bind(this);
        this._determineHeadTextures = this._determineHeadTextures.bind(this);
        this._determineHairTextures = this._determineHairTextures.bind(this);
        this.sprite.addChild(createAnimatedSprite(Character.#bodySpritesheet.animations.down));
        this.sprite.addChild(createAnimatedSprite(Character.#headSpritesheet.animations.down));
        this.sprite.addChild(createAnimatedSprite(Character.#hairSpritesheet.animations.down));
    }
    _updateTextures() {
        this._updateTexture(0, this._determineBodyTextures);
        this._updateTexture(1, this._determineHeadTextures);
        this._updateTexture(2, this._determineHairTextures);
    }
    _updateTexture(index, determineTexture) {
        const textures = determineTexture();
        const animatedSprite = this.sprite.children[index];
        if (animatedSprite.textures !== textures) {
            animatedSprite.textures = textures;
            if (this.isMoving) {
                animatedSprite.play();
            }
        }
        if (!this.isMoving) {
            animatedSprite.gotoAndStop(0);
        }
    }
    _play() {
        this.sprite.children.map((child) => child.play());
    }
    _stop() {
        this.sprite.children.map((child) => child.stop());
    }
    _determineBodyTextures() {
        return this._determineTexture(Character.#bodySpritesheet);
    }
    _determineHeadTextures() {
        return this._determineTexture(Character.#headSpritesheet);
    }
    _determineHairTextures() {
        return this._determineTexture(Character.#hairSpritesheet);
    }
    _determineTexture(spritesheet) {
        if (hasFlag(this.direction, Direction.Up)) {
            return spritesheet.animations.up;
        }
        else if (hasFlag(this.direction, Direction.Down)) {
            return spritesheet.animations.down;
        }
        else if (hasFlag(this.direction, Direction.Left)) {
            return spritesheet.animations.left;
        }
        else if (hasFlag(this.direction, Direction.Right)) {
            return spritesheet.animations.right;
        }
        else {
            return spritesheet.animations.down;
        }
    }
}
//# sourceMappingURL=Character.js.map