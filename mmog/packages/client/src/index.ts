import {
  Action,
  compressMoveData,
  decompressMoveFromServerData,
  Direction,
  MoveData,
} from "@sanjo/mmog-shared/communication.js"
import { debounce, throttle } from "lodash-es"
import { AnimatedSprite, Application, Assets, Spritesheet } from "pixi.js"

let i = 0

declare global {
  interface Window {
    IS_DEVELOPMENT: boolean
    SERVER_URL: string
  }
}

if (window.IS_DEVELOPMENT) {
  new EventSource("/esbuild").addEventListener("change", () =>
    location.reload(),
  )
}

const app = new Application({
  backgroundColor: 0x2f8136,
  resizeTo: window,
})
document.body.appendChild(app.view as any)

Assets.add(
  "idle",
  "assets/sprite/character/Body/Base/Human_male/Ivory/idle.json",
)
Assets.add(
  "walk",
  "assets/sprite/character/Body/Base/Human_male/Ivory/walk.json",
)
const { idle: idleSpritesheet, walk: walkSpritesheet } =
  await Assets.load<Spritesheet>(["idle", "walk"])

type Character = AnimatedSprite & { lastI: number | null; direction: Direction }

function createPhysicalBody(): Character {
  const physicalBody = new AnimatedSprite([
    idleSpritesheet.textures.down,
  ]) as Character
  physicalBody.anchor.set(0.5, 1)
  physicalBody.animationSpeed = 0.115
  physicalBody.lastI = null
  physicalBody.direction = Direction.Down
  return physicalBody
}

const physicalBodies = new Map<string, Character>()
const physicalBody = createPhysicalBody()
app.stage.addChild(physicalBody)
updateViewport()

const keyStates = new Map([
  ["KeyA", false],
  ["KeyD", false],
  ["KeyW", false],
  ["KeyS", false],
])

window.addEventListener("keydown", function (event) {
  if (keyStates.has(event.code)) {
    event.preventDefault()
    keyStates.set(event.code, true)
  }
})

window.addEventListener("keyup", function (event) {
  if (keyStates.has(event.code)) {
    keyStates.set(event.code, false)
  }
})

const sendMoveToServer = throttle(function sendMoveToServer(data: MoveData) {
  const OPEN = 1
  if (socket.readyState === OPEN) {
    socket.send(
      JSON.stringify({
        action: Action.Move,
        data: compressMoveData({
          ...data,
          i,
        }),
      }),
    )
    i++
  }
}, 1000 / 30)

const movingTextures: any = [
  walkSpritesheet.animations.left,
  walkSpritesheet.animations.right,
  walkSpritesheet.animations.up,
  walkSpritesheet.animations.down,
]

function isMoving(physicalBody: AnimatedSprite): boolean {
  return movingTextures.includes(physicalBody.textures)
}

const idle = {
  left: [idleSpritesheet.textures.left],
  right: [idleSpritesheet.textures.right],
  up: [idleSpritesheet.textures.up],
  down: [idleSpritesheet.textures.down],
}

let direction: Direction = Direction.Down

function removeDirection(
  direction: Direction,
  directionToRemove: Direction,
): Direction {
  return direction & ~directionToRemove
}

function addDirection(
  direction: Direction,
  directionToAdd: Direction,
): Direction {
  return direction | directionToAdd
}

app.ticker.add((delta) => {
  const left = keyStates.get("KeyA")
  const right = keyStates.get("KeyD")
  const up = keyStates.get("KeyW")
  const down = keyStates.get("KeyS")
  let hasPositionChanged = false
  const wasMoving = isMoving(physicalBody)
  let previousDirection = direction
  if (left && !right) {
    if (physicalBody.textures !== walkSpritesheet.animations.left) {
      physicalBody.textures = walkSpritesheet.animations.left
    }
    direction = removeDirection(direction, Direction.Right)
    direction = addDirection(direction, Direction.Left)
    physicalBody.x -= delta
    hasPositionChanged = true
  } else if (right && !left) {
    if (physicalBody.textures !== walkSpritesheet.animations.right) {
      physicalBody.textures = walkSpritesheet.animations.right
    }
    direction = removeDirection(direction, Direction.Left)
    direction = addDirection(direction, Direction.Right)
    physicalBody.x += delta
    hasPositionChanged = true
  } else {
    direction = removeDirection(direction, Direction.Left)
    direction = removeDirection(direction, Direction.Right)
  }
  if (up && !down) {
    if (physicalBody.textures !== walkSpritesheet.animations.up) {
      physicalBody.textures = walkSpritesheet.animations.up
    }
    direction = removeDirection(direction, Direction.Down)
    direction = addDirection(direction, Direction.Up)
    physicalBody.y -= delta
    hasPositionChanged = true
  } else if (down && !up) {
    if (physicalBody.textures !== walkSpritesheet.animations.down) {
      physicalBody.textures = walkSpritesheet.animations.down
    }
    direction = removeDirection(direction, Direction.Up)
    direction = addDirection(direction, Direction.Down)
    physicalBody.y += delta
    hasPositionChanged = true
  } else {
    direction = removeDirection(direction, Direction.Up)
    direction = removeDirection(direction, Direction.Down)
  }
  if (hasPositionChanged) {
    physicalBody.play()
    updateViewport()
  } else {
    physicalBody.stop()
    if (physicalBody.textures === walkSpritesheet.animations.left) {
      physicalBody.textures = idle.left
    } else if (physicalBody.textures === walkSpritesheet.animations.right) {
      physicalBody.textures = idle.right
    } else if (physicalBody.textures === walkSpritesheet.animations.up) {
      physicalBody.textures = idle.up
    } else if (physicalBody.textures === walkSpritesheet.animations.down) {
      physicalBody.textures = idle.down
    }
  }
  const isMovingNow = isMoving(physicalBody)
  const hasStopped = wasMoving && !isMovingNow
  if (hasStopped) {
    direction = previousDirection
  }
  const hasStartedToMove = !wasMoving && isMovingNow
  const hasDirectionChanged = direction !== previousDirection
  if (hasDirectionChanged || hasStopped || hasStartedToMove) {
    sendMoveToServer({
      isMoving: hasPositionChanged,
      x: physicalBody.x,
      y: physicalBody.y,
      direction,
    })
  }

  for (const physicalBody of physicalBodies.values()) {
    if (isMoving(physicalBody)) {
      if (hasFlag(physicalBody.direction, Direction.Left)) {
        physicalBody.x -= delta
      } else if (hasFlag(physicalBody.direction, Direction.Right)) {
        physicalBody.x += delta
      }
      if (hasFlag(physicalBody.direction, Direction.Up)) {
        physicalBody.y -= delta
      } else if (hasFlag(physicalBody.direction, Direction.Down)) {
        physicalBody.y += delta
      }
    }
  }
})

function hasFlag(flags: number, flag: number): boolean {
  return (flags & flag) === flag
}

function updateViewport() {
  app.stage.x = 0.5 * app.view.width - physicalBody.x
  app.stage.y = 0.5 * app.view.height - physicalBody.y
}

// const tileMap = new CompositeTilemap()
// app.stage.addChild(tileMap)
//
// const TILE_WIDTH = 32
// const TILE_HEIGHT = 32
//
// for (let y = 0; y < app.view.height; y += TILE_HEIGHT) {
//   for (let x = 0; x < app.view.width; x += TILE_WIDTH) {
//     tileMap.tile(textureName, x, y)
//   }
// }

const socket = new WebSocket(
  "wss://0umom0d6od.execute-api.eu-central-1.amazonaws.com/Prod",
)

socket.onmessage = function (event) {
  const body = JSON.parse(event.data)
  const { action, data } = body
  if (action === Action.Move) {
    const moveData = decompressMoveFromServerData(data)
    console.log(action, moveData)
    let physicalBody = physicalBodies.get(moveData.connectionId)
    if (!physicalBody) {
      physicalBody = createPhysicalBody()
      app.stage.addChild(physicalBody)
      physicalBodies.set(moveData.connectionId, physicalBody)
    }
    if (physicalBody.lastI === null || physicalBody.lastI < moveData.i) {
      physicalBody.x = moveData.x
      physicalBody.y = moveData.y
      physicalBody.direction = moveData.direction
      let textures
      if (moveData.isMoving) {
        if (hasFlag(moveData.direction, Direction.Down)) {
          textures = walkSpritesheet.animations.down
        } else if (hasFlag(moveData.direction, Direction.Up)) {
          textures = walkSpritesheet.animations.up
        } else if (hasFlag(moveData.direction, Direction.Left)) {
          textures = walkSpritesheet.animations.left
        } else if (hasFlag(moveData.direction, Direction.Right)) {
          textures = walkSpritesheet.animations.right
        }
      } else {
        if (hasFlag(moveData.direction, Direction.Down)) {
          textures = idle.down
        } else if (hasFlag(moveData.direction, Direction.Up)) {
          textures = idle.up
        } else if (hasFlag(moveData.direction, Direction.Left)) {
          textures = idle.left
        } else if (hasFlag(moveData.direction, Direction.Right)) {
          textures = idle.right
        }
      }
      if (textures && physicalBody.textures !== textures) {
        physicalBody.textures = textures
        if (moveData.isMoving) {
          physicalBody.play()
        }
      }

      physicalBody.lastI = moveData.i
    }
  } else {
    console.log(body)
  }
}

socket.onopen = function () {
  sendMoveToServer({
    isMoving: false,
    direction: Direction.Down,
    x: physicalBody.x,
    y: physicalBody.y,
  })
}

window.addEventListener(
  "resize",
  debounce(function () {
    updateViewport()
  }, 300),
)
