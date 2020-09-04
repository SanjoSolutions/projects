import { cancelableDebounce } from '../cancelableDebounce.js';
import { colorToString } from '../colorToString.js';
import { Grid } from '../Grid.js';
import { hslToRgb } from '../hslToRgb.js';
import { getValue, setValue } from '../localStorageDB.js';
import { radianToDegrees } from '../radianToDegrees.js';
import { rgbToHsl } from '../rgbToHsl.js';
import * as THREE from './node_modules/three/build/three.module.js';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';

const planeWidth = 100
const planeDepth = 100
const maxHeight = 100

async function main() {
  const storageKey = "cubeColors"
  async function loadCubeColors() {
    return getValue(storageKey)
  }

  const dimensions = [planeWidth, maxHeight, planeDepth]
  const cubeColors = new Grid(dimensions, await loadCubeColors())
  const cubes = new Grid(dimensions)

  function getCubeColors() {
    return cubeColors.values()
  }

  let hasUnsavedChanges = false
  const [saveCubeColorsDebounced, cancelSaveCubeColors] = cancelableDebounce(
    function () {
      setValue(storageKey, getCubeColors())
      hasUnsavedChanges = false
      console.log("saved")
    },
    1000
  )

  function saveCubeColors() {
    hasUnsavedChanges = true
    saveCubeColorsDebounced()
  }

  function saveCubeColorsIfHasUnsavedChanges() {
    if (hasUnsavedChanges) {
      saveCubeColors()
    }
  }

  let lightness = 0.8
  let color = 0xcccccc

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.x = 0.5 * planeWidth
  camera.position.y = 10
  camera.position.z = 0.5 * planeDepth + 20

  const renderer = new THREE.WebGLRenderer()
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true
  document.body.appendChild(renderer.domElement)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.maxPolarAngle = Math.PI * 0.5
  controls.minDistance = 1
  controls.maxDistance = 5000

  controls.target = new THREE.Vector3(0.5 * planeWidth, 0, 0.5 * planeDepth)
  controls.update()

  // const ambientLight = createAmbientLight()
  // scene.add(ambientLight)

  const hemisphereLight = createHemisphereLight()
  scene.add(hemisphereLight)

  const directionalLight = createDirectionalLight()
  scene.add(directionalLight)

  // const directionalLightHelper = new THREE.DirectionalLightHelper(
  //   directionalLight,
  //   10
  // )
  // scene.add(directionalLightHelper)

  const plane = createPlane()
  scene.add(plane)

  for (const [position, cubeColor] of cubeColors.entries()) {
    if (cubeColor) {
      cubes.set(position, createCube(cubeColor, position))
    }
  }

  for (const [position, cube] of cubes.entries()) {
    if (cube) {
      scene.add(cube)
    }
  }

  const raycaster = new THREE.Raycaster()

  function setColor(_color) {
    color = _color
  }

  window.setColor = setColor

  let lastCameraPosition
  renderer.domElement.addEventListener("pointerdown", () => {
    cancelSaveCubeColors()
    lastCameraPosition = camera.position.clone()
  })

  renderer.domElement.addEventListener("pointerup", (event) => {
    const button = event.button
    if ([0, 2].includes(button) && camera.position.equals(lastCameraPosition)) {
      const mousePosition = new THREE.Vector2(
        (event.pageX / window.innerWidth) * 2 - 1,
        -(event.pageY / window.innerHeight) * 2 + 1
      )
      raycaster.setFromCamera(mousePosition, camera)
      const intersections = raycaster.intersectObjects(scene.children)
      const intersection = intersections[0]
      if (intersection) {
        if (button === 0) {
          if (intersection.object.uuid === plane.uuid) {
            const position = [
              Math.round(intersection.point.x),
              Math.max(0, Math.round(intersection.point.y)),
              Math.round(intersection.point.z),
            ]
            while (cubeColors.get(position)) {
              position[1]++
            }
            cubeColors.set(position, color)
            const cube = createCube(color, position)
            console.log("position", position)
            cubes.set(position, cube)
            scene.add(cube)
            saveCubeColors()
          } else {
            // cube
            const position = intersection.object.position.toArray()
            const faceIndex = intersection.faceIndex
            if ([0, 1].includes(faceIndex)) {
              position[0] += 1
            } else if ([2, 3].includes(faceIndex)) {
              position[0] -= 1
            } else if ([4, 5].includes(faceIndex)) {
              position[1] += 1
            } else if ([6, 7].includes(faceIndex)) {
              position[1] -= 1
            } else if ([8, 9].includes(faceIndex)) {
              position[2] += 1
            } else if ([10, 11].includes(faceIndex)) {
              position[2] -= 1
            }
            if (!cubeColors.get(position)) {
              cubeColors.set(position, color)
              const cube = createCube(color, position)
              cubes.set(position, cube)
              scene.add(cube)
              saveCubeColors()
            }
          }
        } else if (button === 2) {
          const position = intersection.object.position.toArray()
          const cubeColor = cubeColors.get(position)
          if (cubeColor) {
            cubeColors.set(position, undefined)
            const cube = cubes.get(position)
            scene.remove(cube)
            cubes.set(position, undefined)
            saveCubeColors()
          }
        }
      }
    }
    saveCubeColorsIfHasUnsavedChanges()
  })

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  window.addEventListener("resize", onWindowResize, false)

  const animate = function () {
    requestAnimationFrame(animate)

    // cube.rotation.x += 0.01
    // cube.rotation.y += 0.01

    renderer.render(scene, camera)
  }

  animate()

  // Color picker
  const colorPicker = document.createElement("div")
  colorPicker.classList.add("color-picker")
  colorPicker.style.backgroundColor = "#" + color.toString(16)

  const colorFieldWidth = 12 // rem
  const colorFieldHeight = 12 // rem
  const lightnessFieldCanvasWidth = 3
  const lightnessFieldCanvasHeight = colorFieldHeight
  const colorPickerDialogWidth = 12 + 1 + lightnessFieldCanvasWidth
  const colorPickerDialogHeight = colorFieldHeight + 2 * 1
  const colorPickerDialog = document.createElement("div")
  colorPickerDialog.classList.add("color-picker-dialog")
  colorPickerDialog.style.width = colorPickerDialogWidth + "rem"
  colorPickerDialog.style.height = colorPickerDialogHeight + "rem"

  const colorField = document.createElement("canvas")
  colorField.classList.add("color-field")
  const devicePixelRatio = window.devicePixelRatio
  const width = colorFieldWidth * 16
  const height = colorFieldHeight * 16
  colorField.width = devicePixelRatio * width
  colorField.height = devicePixelRatio * height
  colorField.style.width = colorFieldWidth + "rem"
  colorField.style.height = colorFieldHeight + "rem"
  const context = colorField.getContext("2d")
  context.scale(devicePixelRatio, devicePixelRatio)

  const center = { x: 0.5 * width, y: 0.5 * height }
  const maxRadius = 0.5 * width

  function renderColorField() {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const angle = Math.atan2(y - center.y, x - center.x)
        const radius = Math.sqrt((center.x - x) ** 2 + (center.y - y) ** 2)
        const normalizedRadius = radius / maxRadius
        const color = {
          hue: Math.round(radianToDegrees(angle)),
          saturation: normalizedRadius,
          lightness,
        }
        const colorString = colorToString(color)
        context.fillStyle = colorString
        context.fillRect(x, y, 1, 1)
      }
    }
  }

  renderColorField()

  function onColorFieldMouseEvent(event) {
    const x = event.offsetX
    const y = event.offsetY
    let angle = Math.atan2(y - center.y, x - center.x)
    if (angle < 0) {
      angle += 2 * Math.PI
    }
    const radius = Math.sqrt((center.x - x) ** 2 + (center.y - y) ** 2)
    const normalizedRadius = radius / maxRadius
    const colorHSL = {
      hue: Math.round(radianToDegrees(angle)),
      saturation: normalizedRadius,
      lightness,
    }
    const colorRGB = hslToRgb(
      colorHSL.hue / 360,
      colorHSL.saturation,
      colorHSL.lightness
    )
    color = colorRGB[0] * 16 ** 4 + colorRGB[1] * 16 ** 2 + colorRGB[2]
    colorPicker.style.backgroundColor = "#" + color.toString(16)
    renderLightnessField()
  }

  colorField.addEventListener("click", onColorFieldMouseEvent)
  let colorFieldPointerDown = false
  colorField.addEventListener("pointerdown", () => {
    colorFieldPointerDown = true
  })
  colorField.addEventListener("pointerup", () => {
    colorFieldPointerDown = false
  })
  colorField.addEventListener("pointermove", (event) => {
    if (colorFieldPointerDown) {
      onColorFieldMouseEvent(event)
    }
  })

  const lightnessField = document.createElement("canvas")
  lightnessField.classList.add("lightness-field")
  const lightnessFieldWidth = lightnessFieldCanvasWidth * 16
  const lightnessFieldHeight = lightnessFieldCanvasHeight * 16
  lightnessField.width = devicePixelRatio * lightnessFieldWidth
  lightnessField.height = devicePixelRatio * lightnessFieldHeight
  lightnessField.style.width = lightnessFieldCanvasWidth + "rem"
  lightnessField.style.height = lightnessFieldCanvasHeight + "rem"
  const lightnessFieldContext = lightnessField.getContext("2d")
  lightnessFieldContext.scale(devicePixelRatio, devicePixelRatio)

  function onLightnessFieldMouseEvent(event) {
    const y = event.offsetY
    lightness = 1 - y / lightnessFieldHeight
    const colorHSL = rgbToHsl(
      (color >> 16) & 0xff,
      (color >> 8) & 0xff,
      color & 0xff
    )
    const _color = {
      hue: colorHSL[0] * 360,
      saturation: colorHSL[1],
      lightness,
    }
    const colorRGB = hslToRgb(
      _color.hue / 360,
      _color.saturation,
      _color.lightness
    )
    color = colorRGB[0] * 16 ** 4 + colorRGB[1] * 16 ** 2 + colorRGB[2]
    colorPicker.style.backgroundColor = "#" + color.toString(16)
    renderColorField()
  }

  lightnessField.addEventListener("click", onLightnessFieldMouseEvent)

  let lightnessFieldPointerDown = false
  lightnessField.addEventListener("pointerdown", () => {
    lightnessFieldPointerDown = true
  })
  lightnessField.addEventListener("pointerup", () => {
    lightnessFieldPointerDown = false
  })
  lightnessField.addEventListener("pointermove", (event) => {
    if (lightnessFieldPointerDown) {
      onLightnessFieldMouseEvent(event)
    }
  })

  function renderLightnessField() {
    const colorHSL = rgbToHsl(
      (color >> 16) & 0xff,
      (color >> 8) & 0xff,
      color & 0xff
    )
    for (let y = 0; y < lightnessFieldHeight; y++) {
      const lightness = 1 - y / lightnessFieldHeight
      const _color = {
        hue: colorHSL[0] * 360,
        saturation: colorHSL[1],
        lightness,
      }
      const colorString = colorToString(_color)
      lightnessFieldContext.fillStyle = colorString
      lightnessFieldContext.fillRect(0, y, lightnessFieldWidth, 1)
    }
  }

  renderLightnessField()

  const colorPickerSelector = document.createElement("div")
  colorPickerSelector.classList.add("color-picker-selector")

  colorPickerDialog.appendChild(colorField)
  colorPickerDialog.appendChild(lightnessField)
  colorPickerDialog.appendChild(colorPickerSelector)

  document.body.appendChild(colorPickerDialog)
  document.body.appendChild(colorPicker)
  // // Color picker
}

main()

function createPlane() {
  const geometry = new THREE.PlaneBufferGeometry(planeWidth, planeDepth)
  const material = new THREE.MeshStandardMaterial({ color: 0xdddddd })
  const plane = new THREE.Mesh(geometry, material)
  plane.rotation.x = -Math.PI / 2
  plane.position.x = 0.5 * planeWidth - 0.5
  plane.position.y = -0.5
  plane.position.z = 0.5 * planeDepth - 0.5
  plane.receiveShadow = true
  return plane
}

function createCube(color, position) {
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshStandardMaterial({ color })
  const cube = new THREE.Mesh(geometry, material)
  cube.position.set(...position)
  cube.castShadow = true
  return cube
}

function createAmbientLight() {
  return new THREE.AmbientLight(0x666666)
}

function createHemisphereLight() {
  const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.3)
  // hemisphereLight.color.setHSL(0.6, 1, 0.6)
  // hemisphereLight.groundColor.setHSL(0.095, 1, 0.75)
  hemisphereLight.position.set(0, 70, 0)
  return hemisphereLight
}

function createDirectionalLight() {
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  // directionalLight.color.setHSL(0.1, 1, 0.95)
  directionalLight.position.set(-1, 1.75, 1)
  directionalLight.position.multiplyScalar(30)

  directionalLight.castShadow = true

  directionalLight.shadow.mapSize.width = 2048
  directionalLight.shadow.mapSize.height = 2048

  var distance = 50

  directionalLight.shadow.camera.left = -distance
  directionalLight.shadow.camera.right = distance
  directionalLight.shadow.camera.top = distance
  directionalLight.shadow.camera.bottom = -distance

  directionalLight.shadow.camera.far = 3500
  directionalLight.shadow.bias = -0.0001

  return directionalLight
}
