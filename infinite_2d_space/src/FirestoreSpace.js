import { onSnapshot, doc } from 'firebase/firestore'
import { getDatabase } from '../../firebase/getDatabase.js'
import { Space } from './Space2.js'

export class FirestoreSpace {
  constructor() {
    this._space = new Space()
  }

  setViewport(viewport) {
    if (this._unsubscribe) {
      this._unsubscribe()
    }
    const database = getDatabase()
    this._unsubscribe = onSnapshot(
      doc(database, 'pixels', '0'),
      snapshot => {
        this._space = new Space()
        const data = snapshot.data()
        const {pixels} = data
        for (const yKey of Object.keys(pixels)) {
          const y = Number(yKey)
          const row = pixels[yKey]
          for (const xKey of Object.keys(row)) {
            const x = Number(xKey)
            this.setPixel({x, y})
          }
        }
      },
    )
  }

  _convertPositionToId(position) {
    const { x, y } = position
    return `${ x }_${ y }`
  }

  _convertIdToPosition(id) {
    const parts = id.split('_')
    const x = Number(parts[0])
    const y = Number(parts[1])
    return { x, y }
  }

  get({ x, y }) {
    return this._space.get({ x, y })
  }

  set({ x, y }) {
    this._space.set({ x, y })
  }
}
