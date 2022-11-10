import { Origin } from "./Origin.js";

export class GameObject {
  constructor(boundingBox, sprite) {
    this.x = 0;
    this.y = 0;
    this.origin = Origin.TopLeft;
    this.boundingBox = boundingBox;
    this.sprite = sprite;
  }
}
