import type { BoundingBox } from "./BoundingBox.js";
import { Origin } from "./Origin.js";
import type { Sprite } from "./Sprite.js";

export class GameObject {
  x: number;
  y: number;
  origin: Origin;
  boundingBox: BoundingBox;
  sprite: Sprite;

  constructor(boundingBox: BoundingBox, sprite: Sprite) {
    this.x = 0;
    this.y = 0;
    this.origin = Origin.TopLeft;
    this.boundingBox = boundingBox;
    this.sprite = sprite;
  }
}
