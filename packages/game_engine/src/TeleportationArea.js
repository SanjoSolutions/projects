export class TeleportationArea {
  constructor(x, y, width, height, target) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.target = target;
  }

  /**
   * @param {GameObject} gameObject
   */
  isGameObjectInside(gameObject) {
    const { x: gameObjectX, y: gameObjectY } = gameObject;
    return (
      gameObjectX >= this.x &&
      gameObjectX <= this.x + this.width &&
      gameObjectY >= this.y &&
      gameObjectY <= this.y + this.height
    );
  }
}
