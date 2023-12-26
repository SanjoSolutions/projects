import { Container, Sprite } from "pixi.js";
import { Direction } from "../../shared/Direction.js";
import { updatePosition } from "../../updatePosition.js";
export class Object {
    lastI = null;
    _direction = Direction.Down;
    _isMoving = false;
    sprite = new Sprite();
    baseX = null;
    baseY = null;
    whenMovingHasChanged = null;
    container;
    constructor(container) {
        this.container = container;
        this.sprite.anchor.set(0.5, 1);
    }
    get direction() {
        return this._direction;
    }
    set direction(direction) {
        this._direction = direction;
        this._updateTextures();
    }
    get isMoving() {
        return this._isMoving;
    }
    set isMoving(isMoving) {
        this._isMoving = isMoving;
        this._updateTextures();
        if (isMoving) {
            this._play();
        }
        else {
            this._stop();
        }
    }
    _play() {
        throw new Error("Please implement in a subclass.");
    }
    _stop() {
        throw new Error("Please implement in a subclass.");
    }
    get x() {
        return this.sprite.x;
    }
    set x(x) {
        this.sprite.x = x;
    }
    get y() {
        return this.sprite.y;
    }
    set y(y) {
        this.sprite.y = y;
    }
    updatePosition() {
        if (this.whenMovingHasChanged &&
            typeof this.baseX === "number" &&
            typeof this.baseY === "number") {
            const movable = {
                x: this.baseX,
                y: this.baseY,
                isMoving: this.isMoving,
                direction: this.direction,
            };
            updatePosition(movable, Date.now() - this.whenMovingHasChanged);
            this.x = movable.x;
            this.y = movable.y;
        }
    }
    _updateTextures() {
        throw new Error("Please implement in a subclass.");
    }
    update(data) {
        this.whenMovingHasChanged = Date.now();
        this.baseX = data.x;
        this.baseY = data.y;
        this.direction = data.direction;
        this.isMoving = data.isMoving;
        this.x = data.x;
        const previousY = data.y;
        this.y = data.y;
        this.updatePosition();
        const isDifferentYCoordinate = this.y !== previousY;
        if (isDifferentYCoordinate) {
            this.updateRenderPosition();
        }
    }
    updateRenderPosition() {
        this.container.removeChild(this.sprite);
        let index = 0;
        while (index < this.container.children.length &&
            this.y > this.container.getChildAt(index).y) {
            index++;
        }
        if (index === this.container.children.length) {
            this.container.addChild(this.sprite);
        }
        else {
            this.container.addChildAt(this.sprite, index);
        }
    }
}
//# sourceMappingURL=Object.js.map