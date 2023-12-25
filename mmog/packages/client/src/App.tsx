import { Authenticator } from "@aws-amplify/ui-react"
import "@aws-amplify/ui-react/styles.css"
import { Stage } from "@pixi/react"
import { sound } from "@pixi/sound"
import { Auth, Hub } from "aws-amplify"
import { debounce } from "lodash-es"
import type { Application } from "pixi.js"
import { AnimatedSprite, Assets, Container, Spritesheet } from "pixi.js"
import React from "react"
import {
  compressMoveDataWithI,
  MessageType,
  MoveData,
} from "../../shared/communication/communication.js"
import { decompressMoveFromServerData } from "../../shared/communication/messagesFromServer.js"
import { Direction } from "../../shared/Direction.js"
import { ObjectType } from "../../shared/ObjectType.js"
import { PlantType } from "../../shared/PlantType.js"
import { Character } from "./Character.js"
import { createAnimatedSprite } from "./createAnimatedSprite.js"
import { Object } from "./Object.js"

export function App() {
  return (
    <Authenticator loginMechanisms={["email"]} signUpAttributes={[]}>
      {({ signOut, user }) => {
        return (
          <>
            <div className="links">
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault()
                  signOut()
                }}
              >
                Log out
              </a>
              <a className="credits" href="credits.html" target="_blank">
                Credits
              </a>
            </div>
            <Stage
              options={{
                backgroundColor: 0x2f8136,
                resizeTo: document.querySelector("#root") as HTMLDivElement,
                resolution: window.devicePixelRatio,
              }}
              onMount={f}
            ></Stage>
          </>
        )
      }}
    </Authenticator>
  )
}

async function f(app: Application): Promise<void> {
  if (window.IS_DEVELOPMENT) {
    globalThis.__PIXI_APP__ = app
  }

  const characterWidth = 64
  const characterHeight = 64

  app.queueResize()

  let i = 1

  sound.add("music", "assets/music/TownTheme.mp3")
  sound.play("music", { loop: true })

  Assets.add("plants", "assets/sprites/plants.json")
  const {
    plants: plantsSpritesheet,
  }: {
    plants: Spritesheet
  } = (await Assets.load(["plants"])) as any

  let socket: WebSocket | null = null

  try {
    await initializeConnection()
  } catch (error) {
    if (error === "No current user") {
      Hub.listen("auth", async (data) => {
        if (data.payload.event === "signIn") {
          await initializeConnection()
        }
      })
    } else {
      throw error
    }
  }

  const plantTextures = new Map([
    [PlantType.Tomato, plantsSpritesheet.animations.tomato_plant],
    [PlantType.Potato, plantsSpritesheet.animations.potato_plant],
    [PlantType.Carrot, plantsSpritesheet.animations.carrot_plant],
    [PlantType.Artichoke, plantsSpritesheet.animations.artichoke_plant],
    [PlantType.RedPepper, plantsSpritesheet.animations.redPepper_plant],
    [PlantType.Zucchini, plantsSpritesheet.animations.zucchini_plant],
    [PlantType.Corn, plantsSpritesheet.animations.corn_plant],
  ])

  class Plant extends Object {
    plantType: PlantType = PlantType.Tomato
    private _stage: number = 0

    constructor(container: Container) {
      super(container)
      this.sprite.addChild(
        createAnimatedSprite(plantTextures.get(PlantType.Tomato)!),
      )
    }

    get stage(): number {
      return this._stage
    }

    set stage(stage: number) {
      this._stage = stage
      this._updateTextures()
    }

    protected _updateTextures() {
      const textures = plantTextures.get(this.plantType)
      const animatedSprite = this.sprite.children[0] as AnimatedSprite
      if (textures && textures !== animatedSprite.textures) {
        animatedSprite.textures = textures
      }
      animatedSprite.gotoAndStop(this.stage)
    }

    protected _play() {}

    protected _stop() {}

    public update(data: any): void {
      super.update(data)
      this.plantType = data.plantType
      this.stage = data.stage
    }
  }

  const objects = new Map<string, Object>()
  const objectsContainer = new Container()
  const character = new Character(objectsContainer)
  objectsContainer.addChild(character.sprite)
  app.stage.addChild(objectsContainer)
  updateViewport()

  const keyStates = new Map([
    ["KeyA", false],
    ["KeyD", false],
    ["KeyW", false],
    ["KeyS", false],
  ])

  interface PointerState {
    isDown: boolean
    position: { x: number; y: number } | null
  }

  const pointerState: PointerState = {
    isDown: false,
    position: null,
  }

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
  ;(app.view as HTMLCanvasElement).addEventListener(
    "pointerdown",
    function (event) {
      if (event.button === 0) {
        event.preventDefault()
        const x = event.offsetX
        const y = event.offsetY
        pointerState.isDown = true
        pointerState.position = { x, y }
      }
    },
  )
  ;(app.view as HTMLCanvasElement).addEventListener(
    "pointermove",
    function (event) {
      if (pointerState.isDown) {
        event.preventDefault()
        const x = event.offsetX
        const y = event.offsetY
        pointerState.position = { x, y }
      }
    },
  )
  ;(app.view as HTMLCanvasElement).addEventListener(
    "pointerup",
    function (event) {
      if (event.button === 0) {
        pointerState.isDown = false
        pointerState.position = null
      }
    },
  )

  const sendMoveToServer = function sendMoveToServer(data: MoveData) {
    const OPEN = 1
    if (socket && socket.readyState === OPEN) {
      lastSentMovement = {
        ...data,
      }
      socket.send(
        JSON.stringify({
          type: MessageType.Move,
          data: compressMoveDataWithI({
            ...data,
            i,
          }),
        }),
      )
      i++
    }
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

  function convertKeysDownToDirection(
    keysDownAndPointerState: KeysDown & { pointerState: PointerState },
  ): Direction {
    const { left, right, up, down } = cancelOutKeys(keysDownAndPointerState)
    if (left || right || up || down) {
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
    } else {
      const { pointerState } = keysDownAndPointerState
      let direction = Direction.None
      if (pointerState.isDown && pointerState.position) {
        const { x, y } = pointerState.position

        if (x < app.screen.width / 2 - 0.5 * clearArea.width) {
          direction |= Direction.Left
        } else if (x > app.screen.width / 2 + 0.5 * clearArea.width) {
          direction |= Direction.Right
        }
        if (y < app.screen.height / 2 - 0.5 * clearArea.height) {
          direction |= Direction.Up
        } else if (y > app.screen.height / 2 + 0.5 * clearArea.height) {
          direction |= Direction.Down
        }

        return direction
      }

      return Direction.None
    }
  }

  function convertKeysDownToIsMoving(
    keysDownAndPointerState: KeysDown & { pointerState: PointerState },
  ): boolean {
    const { left, right, up, down } = cancelOutKeys(keysDownAndPointerState)
    return Boolean(
      left ||
        right ||
        up ||
        down ||
        (pointerState.isDown &&
          pointerState.position &&
          (pointerState.position.x <
            window.innerWidth / 2 - 0.5 * clearArea.width ||
            pointerState.position.x >
              window.innerWidth / 2 + 0.5 * clearArea.width) &&
          (pointerState.position.y <
            window.innerHeight / 2 - 0.5 * clearArea.height ||
            pointerState.position.y >
              window.innerHeight / 2 + 0.5 * clearArea.height)),
    )
  }

  let lastSentMovement: MoveData | null = {
    isMoving: false,
    direction: Direction.Down,
  }

  const clearArea = {
    width: 64,
    height: 64,
  }

  app.ticker.add(() => {
    const left = keyStates.get("KeyA")!
    const right = keyStates.get("KeyD")!
    const up = keyStates.get("KeyW")!
    const down = keyStates.get("KeyS")!

    const isMoving = convertKeysDownToIsMoving({
      left,
      right,
      up,
      down,
      pointerState,
    })
    const direction = isMoving
      ? convertKeysDownToDirection({
          left,
          right,
          up,
          down,
          pointerState,
        })
      : character.direction

    if (character.isMoving) {
      const previousX = character.x
      const previousY = character.y
      character.updatePosition()
      if (character.y !== previousY) {
        character.updateRenderPosition()
      }
      if (character.x !== previousX || character.y !== previousY) {
        updateViewport()
      }
    }

    if (
      !lastSentMovement ||
      isMoving !== lastSentMovement.isMoving ||
      ((left || right || up || down) &&
        direction !== lastSentMovement.direction)
    ) {
      sendMoveToServer({
        isMoving: isMoving,
        direction: direction,
      })
    }

    for (const object of objects.values()) {
      object.updatePosition()
    }
  })

  function updateViewport() {
    app.stage.x = -(character.x - 0.5 * app.screen.width)
    app.stage.y = -(
      character.y -
      0.5 * characterHeight -
      0.5 * app.screen.height
    )
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

  async function initializeConnection(): Promise<void> {
    const currentSession = await Auth.currentSession()
    const idToken = currentSession.getIdToken().getJwtToken()
    socket = new WebSocket(`${window.WEBSOCKET_API_URL}?idToken=${idToken}`)
    socket.onmessage = function (event) {
      const body = JSON.parse(event.data)
      const { type, data } = body
      if (type === MessageType.Move) {
        const moveData = decompressMoveFromServerData(data)
        let object
        if (moveData.isCharacterOfClient) {
          object = character
        } else {
          object = retrieveOrCreateObject({
            id: moveData.id,
            type: ObjectType.Character,
          })
        }
        if (object.lastI === null || moveData.i > object.lastI) {
          object.update(moveData)
          object.lastI = moveData.i
        }
      } else if (type === MessageType.Objects) {
        const { objects } = data
        for (const objectData of objects) {
          let object
          if (objectData.isCharacterOfClient) {
            object = character
          } else {
            object = retrieveOrCreateObject({
              id: objectData.id,
              type: objectData.type,
            })
          }
          object.update(objectData)
        }
      } else if (type === MessageType.OtherClientDisconnected) {
        const { connectionId } = data
        const object = objects.get(connectionId)
        if (object) {
          objectsContainer.removeChild(object.sprite)
          objects.delete(connectionId)
        }
      } else if (type === MessageType.PlantHasGrown) {
        const { id, stage } = data
        const object = retrieveOrCreateObject({
          id,
          type: ObjectType.Plant,
        }) as Plant
        object.stage = stage
      }
    }

    socket.onopen = function () {
      requestObjects()
    }
  }

  function retrieveOrCreateObject({
    id,
    type,
  }: {
    id: string
    type: ObjectType
  }): Object {
    let object = objects.get(id)
    if (!object) {
      if (type === ObjectType.Character) {
        object = new Character(objectsContainer)
      } else if (type === ObjectType.Plant) {
        object = new Plant(objectsContainer)
      } else {
        throw new Error("Other type?")
      }
      objectsContainer.addChild(object.sprite)
      objects.set(id, object)
    }
    return object
  }

  function requestObjects(): void {
    if (socket) {
      socket.send(
        JSON.stringify({
          type: MessageType.RequestObjects,
        }),
      )
    }
  }

  window.addEventListener(
    "resize",
    debounce(function () {
      updateViewport()
    }, 300),
  )
}
