export class GameObject {
  constructor(boundingBox, sprite) {
    this.origin = { x: 0, y: 0 };
    this.boundingBox = boundingBox;
    this.sprite = sprite;
  }
}
