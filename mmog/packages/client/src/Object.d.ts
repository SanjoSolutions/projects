import { Container, Sprite } from "pixi.js";
import { Direction } from "../../shared/Direction.js";
export declare abstract class Object {
    lastI: number | null;
    _direction: Direction;
    protected _isMoving: boolean;
    sprite: Sprite;
    baseX: number | null;
    baseY: number | null;
    whenMovingHasChanged: number | null;
    container: Container;
    constructor(container: Container);
    get direction(): Direction;
    set direction(direction: Direction);
    get isMoving(): boolean;
    set isMoving(isMoving: boolean);
    protected _play(): void;
    protected _stop(): void;
    get x(): number;
    set x(x: number);
    get y(): number;
    set y(y: number);
    updatePosition(): void;
    protected _updateTextures(): void;
    update(data: any): void;
    updateRenderPosition(): void;
}
//# sourceMappingURL=Object.d.ts.map