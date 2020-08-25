import { Character } from './Character.js'
import { House } from './House.js'
import { Renderer } from './Renderer.js'

export class Game {
  constructor (root, map) {
    this.root = root
    this.map = map
    this.character = new Character()
    this.map.addObject(this.character)
    this.house = new House()
    this.map.addObject(this.house)
    this.renderer = new Renderer(root, map)
  }

  async initialize () {
    await this.renderer.render()
  }
}
