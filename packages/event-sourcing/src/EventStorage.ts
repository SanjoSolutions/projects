import fs from 'fs/promises'

export class EventStorage {
  events: any[]
  _fileName: string

  constructor(fileName: string) {
    this.events = []
    this._fileName = fileName
  }

  async initialize() {
    this.events = JSON.parse(await fs.readFile(this._fileName, { encoding: 'utf-8' }))
  }

  async store(event: any) {
    this.events.push(event)
    await this._persist()
  }

  retrieve() {
    return Array.from(this.events)
  }

  async _persist() {
    await fs.writeFile(this._fileName, JSON.stringify(this.events))
  }
}
