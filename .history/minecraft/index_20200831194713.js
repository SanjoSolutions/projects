import * as THREE from './node_modules/three/build/three.module.js';

//Create a WebGLRenderer and turn on shadows in the renderer
var renderer = new THREE.WebGLRenderer()
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap // default THREE.PCFShadowMap

//Create a DirectionalLight and turn on shadows for the light
var light = new THREE.DirectionalLight(0xffffff, 1, 100)
light.position.set(0, 1, 0) //default; light shining from top
light.castShadow = true // default false
scene.add(light)

//Set up shadow properties for the light
light.shadow.mapSize.width = 512 // default
light.shadow.mapSize.height = 512 // default
light.shadow.camera.near = 0.5 // default
light.shadow.camera.far = 500 // default

//Create a sphere that cast shadows (but does not receive them)
var sphereGeometry = new THREE.SphereBufferGeometry(5, 32, 32)
var sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 })
var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphere.castShadow = true //default is false
sphere.receiveShadow = false //default
scene.add(sphere)

//Create a plane that receives shadows (but does not cast them)
var planeGeometry = new THREE.PlaneBufferGeometry(20, 20, 32, 32)
var planeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 })
var plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.receiveShadow = true
scene.add(plane)

//Create a helper for the shadow camera (optional)
var helper = new THREE.CameraHelper(light.shadow.camera)
scene.add(helper)

/*
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
renderer.shadowMap.type = THREE.PCFSoftShadowMap
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
  const geometry = new THREE.PlaneBufferGeometry(100, 100)
  const material = new THREE.MeshStandardMaterial({ color: 0xdddddd })
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
  directionalLight.position.set(0, 1, -0)
  directionalLight.castShadow = true

  return directionalLight
}
*/
