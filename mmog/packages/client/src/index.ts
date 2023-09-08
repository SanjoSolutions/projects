import {
  compressMoveData,
  decompressMoveFromServerData,
  Direction,
  MessageType,
  MoveData,
} from "@sanjo/mmog-shared/communication.js"
import { debounce, throttle } from "lodash-es"
import {
  AnimatedSprite,
  Application,
  Assets,
  Container,
  Resource,
  Spritesheet,
  Texture,
} from "pixi.js"

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

class Character {
  lastI: number | null = null
  _direction: Direction = Direction.Down
  private _isMoving: boolean = false
  sprite: AnimatedSprite = new AnimatedSprite([idleSpritesheet.textures.down])

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
      this.sprite.play()
    } else {
      this.sprite.stop()
    }
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

  constructor() {
    this.sprite.anchor.set(0.5, 1)
    this.sprite.animationSpeed = 0.115
  }

  updatePosition(delta: number): void {
    if (this.isMoving) {
      if (hasFlag(this.direction, Direction.Left)) {
        this.x -= delta
      } else if (hasFlag(this.direction, Direction.Right)) {
        this.x += delta
      }

      if (hasFlag(this.direction, Direction.Up)) {
        this.y -= delta
      } else if (hasFlag(this.direction, Direction.Down)) {
        this.y += delta
      }
    }
  }

  private _updateTextures() {
    const textures = this._determineTextures()
    if (this.sprite.textures !== textures) {
      this.sprite.textures = textures
      if (this.isMoving) {
        this.sprite.play()
      }
    }
  }

  private _determineTextures(): Texture<Resource>[] {
    if (this.isMoving) {
      if (hasFlag(this.direction, Direction.Up)) {
        return walkSpritesheet.animations.up
      } else if (hasFlag(this.direction, Direction.Down)) {
        return walkSpritesheet.animations.down
      } else if (hasFlag(this.direction, Direction.Left)) {
        return walkSpritesheet.animations.left
      } else if (hasFlag(this.direction, Direction.Right)) {
        return walkSpritesheet.animations.right
      } else {
        return idle.down
      }
    } else {
      if (hasFlag(this.direction, Direction.Up)) {
        return idle.up
      } else if (hasFlag(this.direction, Direction.Down)) {
        return idle.down
      } else if (hasFlag(this.direction, Direction.Left)) {
        return idle.left
      } else if (hasFlag(this.direction, Direction.Right)) {
        return idle.right
      } else {
        return idle.down
      }
    }
  }
}

const characters = new Map<string, Character>()
const character = new Character()
const charactersContainer = new Container()
charactersContainer.addChild(character.sprite)
app.stage.addChild(charactersContainer)
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
        type: MessageType.Move,
        data: compressMoveData({
          ...data,
          i,
        }),
      }),
    )
    i++
  }
}, 1000 / 30)

const idle = {
  left: [idleSpritesheet.textures.left],
  right: [idleSpritesheet.textures.right],
  up: [idleSpritesheet.textures.up],
  down: [idleSpritesheet.textures.down],
}

interface KeysDown {
  left: boolean
  right: boolean
  up: boolean
  down: boolean
}

function cancelOutKeys({ left, right, up, down }: KeysDown): KeysDown {
  if (left && right) {
    left = false
    right = false
  }
  if (up && down) {
    up = false
    down = false
  }
  return { left, right, up, down }
}

function convertKeysDownToDirection(keysDown: KeysDown): Direction {
  const { left, right, up, down } = cancelOutKeys(keysDown)
  let direction: Direction = Direction.None
  if (left) {
    direction |= Direction.Left
  } else if (right) {
    direction |= Direction.Right
  }
  if (up) {
    direction |= Direction.Up
  } else if (down) {
    direction |= Direction.Down
  }
  return direction
}

function convertKeysDownToIsMoving(keysDown: KeysDown): boolean {
  const { left, right, up, down } = cancelOutKeys(keysDown)
  return left || right || up || down
}

app.ticker.add((delta) => {
  const left = keyStates.get("KeyA")!
  const right = keyStates.get("KeyD")!
  const up = keyStates.get("KeyW")!
  const down = keyStates.get("KeyS")!

  const wasMoving = character.isMoving
  const previousDirection = character.direction

  character.isMoving = convertKeysDownToIsMoving({ left, right, up, down })
  if (character.isMoving) {
    character.direction = convertKeysDownToDirection({ left, right, up, down })
  }
  const previousX = character.x
  const previousY = character.y
  character.updatePosition(delta)
  if (character.y !== previousY) {
    updateCharacterRenderPosition(character)
  }
  if (character.x !== previousX || character.y !== previousY) {
    updateViewport()
  }

  if (
    character.isMoving !== wasMoving ||
    character.direction !== previousDirection
  ) {
    sendMoveToServer({
      isMoving: character.isMoving,
      x: character.x,
      y: character.y,
      direction: character.direction,
    })
  }

  for (const character of characters.values()) {
    character.updatePosition(delta)
  }
})

function hasFlag(flags: number, flag: number): boolean {
  return (flags & flag) === flag
}

function updateViewport() {
  app.stage.x = 0.5 * app.view.width - character.x
  app.stage.y = 0.5 * app.view.height - character.y
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
  "wss://ggzdmf37h3.execute-api.eu-central-1.amazonaws.com/Prod",
)

function updateCharacterRenderPosition(character: Character): void {
  charactersContainer.removeChild(character.sprite)
  let index = 0
  while (
    index < charactersContainer.children.length &&
    character.y > charactersContainer.getChildAt(index).y
  ) {
    index++
  }
  if (index === charactersContainer.children.length) {
    charactersContainer.addChild(character.sprite)
  } else {
    charactersContainer.addChildAt(character.sprite, index)
  }
}

socket.onmessage = function (event) {
  console.log("onmessage", event.data)
  const body = JSON.parse(event.data)
  const { type, data } = body
  if (type === MessageType.Move) {
    const moveData = decompressMoveFromServerData(data)
    console.log(type, moveData)
    const character = retrieveCharacter(moveData.connectionId)
    if (character.lastI === null || moveData.i > character.lastI) {
      updateCharacter(character, moveData)
      character.lastI = moveData.i
    }
  } else if (type === MessageType.Characters) {
    const { characters } = data
    for (const characterData of characters) {
      const character = retrieveCharacter(characterData.connectionId)
      updateCharacter(character, characterData)
    }
  } else {
    console.log(body)
  }
}

function retrieveCharacter(connectionId: string): Character {
  let character = characters.get(connectionId)
  if (!character) {
    character = new Character()
    charactersContainer.addChild(character.sprite)
    characters.set(connectionId, character)
  }
  return character
}

function updateCharacter(character: Character, characterData: any): void {
  character.x = characterData.x
  const isDifferentYCoordinate = character.y !== characterData.y
  character.y = characterData.y
  if (isDifferentYCoordinate) {
    updateCharacterRenderPosition(character)
  }
  character.direction = characterData.direction
  character.isMoving = characterData.isMoving
}

socket.onopen = function () {
  sendMoveToServer({
    isMoving: false,
    direction: Direction.Down,
    x: character.x,
    y: character.y,
  })
  requestCharacters()
}

function requestCharacters(): void {
  socket.send(
    JSON.stringify({
      type: MessageType.RequestCharacters,
    }),
  )
}

window.addEventListener(
  "resize",
  debounce(function () {
    updateViewport()
  }, 300),
)
