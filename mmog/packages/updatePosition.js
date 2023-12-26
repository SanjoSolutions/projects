import { hasFlag } from "./hasFlag.js";
import { Direction } from "./shared/Direction.js";
import { SPEED } from "./speed.js";
export function updatePosition(object, timeElapsed) {
    if (object.isMoving) {
        const delta = SPEED * timeElapsed;
        if (hasFlag(object.direction, Direction.Left)) {
            object.x -= delta;
        }
        else if (hasFlag(object.direction, Direction.Right)) {
            object.x += delta;
        }
        if (hasFlag(object.direction, Direction.Up)) {
            object.y -= delta;
        }
        else if (hasFlag(object.direction, Direction.Down)) {
            object.y += delta;
        }
    }
}
//# sourceMappingURL=updatePosition.js.map