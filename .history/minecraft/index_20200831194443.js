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
renderer.shadowMap.enabled = true
document.body.appendChild(renderer.domElement)

const ambientLight = createAmbientLight()
scene.add(ambientLight)

const hemisphereLight = createHemisphereLight()
scene.add(hemisphereLight)

const directionalLight = createDirectionalLight()
scene.add(directionalLight)

const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  10
)
scene.add(directionalLightHelper)

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
  plane.receiveShadow = true
  return plane
}

function createCube(color, position) {
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({ color })
  const cube = new THREE.Mesh(geometry, material)
  cube.position.x = position.x
  cube.position.y = position.y
  cube.position.z = position.z
  cube.castShadow = true
  return cube
}

function createAmbientLight() {
  return new THREE.AmbientLight(0x666666)
}

function createHemisphereLight() {
  const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6)
  hemisphereLight.color.setHSL(0.6, 1, 0.6)
  hemisphereLight.groundColor.setHSL(0.095, 1, 0.75)
  hemisphereLight.position.set(0, 50, 0)
  return hemisphereLight
}

function createDirectionalLight() {
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.position.set(0, 0, -20)
  directionalLight.castShadow = true

  return directionalLight
}
