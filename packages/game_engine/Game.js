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
  }

  _onPrimaryClick (event) {
    this._moveCharacter({ x: event.pageX, y: event.pageY })
  }

  _moveCharacter ({ x, y }) {
    console.log('moveCharacter', { x, y })
    this.character.boundingBox.x = x
    this.character.boundingBox.y = y
    this.renderer.render()
  }

  async initialize () {
    this.renderer.initialize()
    await this.renderer.render()
  }
}
