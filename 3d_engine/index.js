import * as THREE from "./node_modules/three/build/three.module.js"

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1)
scene.add(light)

const directionalLight = createDirectionalLight()
scene.add(directionalLight)

const geometry = new THREE.SphereGeometry(0.5, 128, 128)
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 })
const object = new THREE.Mesh(geometry, material)
scene.add(object)

camera.position.z = 5

const animate = function () {
  requestAnimationFrame(animate)

  object.rotation.x += 0.01
  object.rotation.y += 0.01

  renderer.render(scene, camera)
}

animate()

function createDirectionalLight() {
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.position.set(25, 25, 25)
  directionalLight.target.position.set(0, 0, 0)
  directionalLight.target.updateMatrixWorld()

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
