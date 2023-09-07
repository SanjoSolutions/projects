import { AnimatedSprite, Application, Assets, Spritesheet } from "pixi.js"

export {}

declare global {
  interface Window {
    IS_DEVELOPMENT: boolean
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

const physicalBody = new AnimatedSprite([idleSpritesheet.textures.down])
physicalBody.animationSpeed = 0.115
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

app.ticker.add((delta) => {
  const left = keyStates.get("KeyA")
  const right = keyStates.get("KeyD")
  const up = keyStates.get("KeyW")
  const down = keyStates.get("KeyS")
  let hasPositionChanged = false
  if (left && !right) {
    if (physicalBody.textures !== walkSpritesheet.animations.left) {
      physicalBody.textures = walkSpritesheet.animations.left
    }
    physicalBody.x -= delta
    hasPositionChanged = true
  } else if (right && !left) {
    if (physicalBody.textures !== walkSpritesheet.animations.right) {
      physicalBody.textures = walkSpritesheet.animations.right
    }
    physicalBody.x -= delta
    hasPositionChanged = true
  }
  if (up && !down) {
    if (physicalBody.textures !== walkSpritesheet.animations.up) {
      physicalBody.textures = walkSpritesheet.animations.up
    }
    physicalBody.x -= delta
    hasPositionChanged = true
  } else if (down && !up) {
    if (physicalBody.textures !== walkSpritesheet.animations.down) {
      physicalBody.textures = walkSpritesheet.animations.down
    }
    physicalBody.x -= delta
    hasPositionChanged = true
  }
  if (hasPositionChanged) {
    physicalBody.play()
    updateViewport()
  } else {
    physicalBody.stop()
    if (physicalBody.textures === walkSpritesheet.animations.left) {
      physicalBody.textures = [idleSpritesheet.textures.left]
    } else if (physicalBody.textures === walkSpritesheet.animations.right) {
      physicalBody.textures = [idleSpritesheet.textures.right]
    } else if (physicalBody.textures === walkSpritesheet.animations.up) {
      physicalBody.textures = [idleSpritesheet.textures.up]
    } else if (physicalBody.textures === walkSpritesheet.animations.down) {
      physicalBody.textures = [idleSpritesheet.textures.down]
    }
  }
})

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
