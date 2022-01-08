import fs from 'fs/promises'
export class EventStorage {
  events
  _fileName
  _hasBeenInitialized
  constructor(fileName) {
    this.events = []
    this._fileName = fileName
    this._hasBeenInitialized = false
  }
  async initialize() {
    try {
      this.events = JSON.parse(await fs.readFile(this._fileName, { encoding: 'utf-8' }))
    } catch (error) {
      if (error.code === 'ENOENT') {
        this.events = []
      } else {
        throw error
      }
    }
    this._hasBeenInitialized = true
  }
  async store(event) {
    this._verifyInitialized('store')
    this.events.push(event)
    await this._persist()
  }
  retrieve() {
    this._verifyInitialized('retrieve')
    return Array.from(this.events)
  }
  _verifyInitialized(callerName) {
    if (!this._hasBeenInitialized) {
      throw new Error(`Please call initialize() before calling ${callerName}().`)
    }
  }
  async _persist() {
    await fs.writeFile(this._fileName, JSON.stringify(this.events))
  }
}
//# sourceMappingURL=EventStorage.js.map
