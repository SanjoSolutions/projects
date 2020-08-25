import { Subscribable } from './Subscribable.js'

export class Maus {
  constructor () {
    this._isListening = false
    this._primaryClick = new Subscribable()

    this._onPrimaryClick = this._onPrimaryClick.bind(this)
  }

  listen () {
    this._isListening = true
    window.addEventListener('mousedown', this._onPrimaryClick)
  }

  unlisten () {
    this._isListening = false
    window.removeEventListener('mousedown', this._onPrimaryClick)
  }

  _onPrimaryClick (event) {
    if (event.button === 0) {
      this._primaryClick.trigger(event)
    }
  }

  onPrimaryClick (f) {
    this._primaryClick.subscribe(f)
  }
}
