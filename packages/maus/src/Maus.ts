import { Subscribable } from "./Subscribable.js"

export class Maus {
  _isListening: boolean
  _primaryClick: Subscribable

  constructor() {
    this._isListening = false
    this._primaryClick = new Subscribable()

    this._onPrimaryClick = this._onPrimaryClick.bind(this)
  }

  listen() {
    this._isListening = true
    window.addEventListener("pointerdown", this._onPrimaryClick)
  }

  unlisten() {
    this._isListening = false
    window.removeEventListener("pointerdown", this._onPrimaryClick)
  }

  _onPrimaryClick(event: PointerEvent): void {
    if (event.button === 0) {
      this._primaryClick.trigger(event)
    }
  }

  onPrimaryClick(f: (event: PointerEvent) => void): void {
    this._primaryClick.subscribe(f)
  }
}
