import * as THREE from './node_modules/three/build/three.module.js';

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.y = 2

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const hemisphereLight = createHemisphereLight()
scene.add(hemisphereLight)

const directionalLight = createDirectionalLight()
scene.add(directionalLight)

const plane = createPlane()
scene.add(plane)

const cube1 = createCube(0x00ff00, { x: 0, y: 0, z: 0 })
scene.add(cube1)

const cube2 = createCube(0xff0000, { x: 1, y: 0, z: 0 })
scene.add(cube2)

camera.position.z = 5

const animate = function () {
  requestAnimationFrame(animate)

  // cube.rotation.x += 0.01
  // cube.rotation.y += 0.01

  renderer.render(scene, camera)
}

animate()

function createPlane() {
  const geometry = new THREE.PlaneGeometry(100, 100)
  const material = new THREE.MeshBasicMaterial({ color: 0xdddddd })
  const plane = new THREE.Mesh(geometry, material)
  plane.rotation.x = -Math.PI / 2
  plane.position.x = 0
  plane.position.y = -0.5
  plane.position.z = 0
  return plane
}

function createCube(color, position) {
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({ color })
  const cube = new THREE.Mesh(geometry, material)
  cube.position.x = position.x
  cube.position.y = position.y
  cube.position.z = position.z
  return cube
}

function createHemisphereLight() {
  const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6)
  hemisphereLight.color.setHSL(0.6, 1, 0.6)
  hemisphereLight.groundColor.setHSL(0.095, 1, 0.75)
  hemisphereLight.position.set(0, 50, 0)
  scene.add(hemisphereLight)
}

function createDirectionalLight() {
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.color.setHSL(0.1, 1, 0.95)
  directionalLight.position.set(-1, 1.75, 1)
  directionalLight.position.multiplyScalar(30)

  directionalLight.castShadow = true

  directionalLight.shadow.mapSize.width = 2048
  directionalLight.shadow.mapSize.height = 2048

  const distance = 50

  directionalLight.shadow.camera.left = -distance
  directionalLight.shadow.camera.right = distance
  directionalLight.shadow.camera.top = distance
  directionalLight.shadow.camera.bottom = -distance

  directionalLight.shadow.camera.far = 3500
  directionalLight.shadow.bias = -0.0001

  return directionalLight
}
