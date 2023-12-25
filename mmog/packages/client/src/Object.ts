import { Container, Sprite } from "pixi.js"
import { Direction } from "../../shared/Direction.js"
import { updatePosition } from "../../updatePosition.js"

export abstract class Object {
  lastI: number | null = null
  _direction: Direction = Direction.Down
  protected _isMoving: boolean = false
  sprite: Sprite = new Sprite()
  baseX: number | null = null
  baseY: number | null = null
  whenMovingHasChanged: number | null = null
  container: Container

  constructor(container: Container) {
    this.container = container
    this.sprite.anchor.set(0.5, 1)
  }

  get direction(): Direction {
    return this._direction
  }

  set direction(direction: Direction) {
    this._direction = direction
    this._updateTextures()
  }

  get isMoving(): boolean {
    return this._isMoving
  }

  set isMoving(isMoving: boolean) {
    this._isMoving = isMoving
    this._updateTextures()
    if (isMoving) {
      this._play()
    } else {
      this._stop()
    }
  }

  protected _play() {
    throw new Error("Please implement in a subclass.")
  }

  protected _stop() {
    throw new Error("Please implement in a subclass.")
  }

  get x(): number {
    return this.sprite.x
  }

  set x(x: number) {
    this.sprite.x = x
  }

  get y(): number {
    return this.sprite.y
  }

  set y(y: number) {
    this.sprite.y = y
  }

  updatePosition(): void {
    if (
      this.whenMovingHasChanged &&
      typeof this.baseX === "number" &&
      typeof this.baseY === "number"
    ) {
      const movable = {
        x: this.baseX,
        y: this.baseY,
        isMoving: this.isMoving,
        direction: this.direction,
      }
      updatePosition(movable, Date.now() - this.whenMovingHasChanged)
      this.x = movable.x
      this.y = movable.y
    }
  }

  protected _updateTextures() {
    throw new Error("Please implement in a subclass.")
  }

  public update(data: any): void {
    this.whenMovingHasChanged = Date.now()
    this.baseX = data.x
    this.baseY = data.y
    this.direction = data.direction
    this.isMoving = data.isMoving
    this.x = data.x
    const previousY = data.y
    this.y = data.y
    this.updatePosition()
    const isDifferentYCoordinate = this.y !== previousY
    if (isDifferentYCoordinate) {
      this.updateRenderPosition()
    }
  }

  public updateRenderPosition(): void {
    this.container.removeChild(this.sprite)
    let index = 0
    while (
      index < this.container.children.length &&
      this.y > this.container.getChildAt(index).y
    ) {
      index++
    }
    if (index === this.container.children.length) {
      this.container.addChild(this.sprite)
    } else {
      this.container.addChildAt(this.sprite, index)
    }
  }
}
