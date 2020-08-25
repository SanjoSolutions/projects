import { Character } from './Character.js'
import { House } from './House.js'
import { Mouse } from './Mouse.js'
import { Renderer } from './Renderer.js'

export class Game {
  constructor (root, map) {
    this.root = root
    this.map = map
    this.character = new Character(this.map)
    this.map.addObject(this.character)
    this.house = new House()
    this.map.addObject(this.house)
    this.renderer = new Renderer(root, map)
    this.mouse = new Mouse()
    this._onPrimaryClick = this._onPrimaryClick.bind(this)
    this.mouse.onPrimaryClick(this._onPrimaryClick)
    this.mouse.listen()
    this._isRunning = false
    this._onFrame = this._onFrame.bind(this)
  }

  start () {
    this._isRunning = true
    window.requestAnimationFrame(this._onFrame)
  }

  stop () {
    this._isRunning = false
  }

  _onFrame () {
    if (this._isRunning) {
      this.character.moveForOneFrame()
      this.renderer.render()

      window.requestAnimationFrame(this._onFrame)
    }
  }

  _onPrimaryClick (event) {
    this._moveCharacter({ x: event.pageX, y: event.pageY })
  }

  _moveCharacter ({ x, y }) {
    const waypoint = {
      x: x - this.character.origin.x,
      y: y - this.character.origin.y,
    }
    this.character.waypoints.push(waypoint)
  }

  async initialize () {
    this.renderer.initialize()
    await this.renderer.render()
  }
}
