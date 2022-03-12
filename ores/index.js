import { Grid2D as Grid } from '../Grid2D.js'
import { selectRandom } from '../selectRandom.js'

const ORES = ['Coal', 'Gold', 'Silver', 'Copper', 'Iron']
const ORE_SYMBOLS = ['C', 'G', 'S', 'P', 'I']
const ORE_PROBABILITIES = new Map([
  ['Coal', 0.2],
  ['Gold', 0.05],
  ['Silver', 0.07],
  ['Copper', 0.13],
  ['Iron', 0.55],
])

export class OresMap {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.grid = new Grid(width, height)

    const orePlacer = new OrePlacer(this)
    orePlacer.placeOres()
  }
}

export class OrePlacer {
  constructor(map) {
    this.map = map
  }

  placeOres() {
    const chanceForRock = 3 / (20 * 24)
    const chanceForRockContinuation = 1 / 3

    let rockFields = []
    const rockStartPoints = []
    for (let y = 0; y < this.map.height; y++) {
      for (let x = 0; x < this.map.width; x++) {
        if (Math.random() < chanceForRock) {
          rockStartPoints.push({
            position: { x, y },
            type: selectRandom(ORE_PROBABILITIES),
          })
        }
      }
    }

    rockFields = rockFields.concat(rockStartPoints)

    for (const rockStartPoint of rockStartPoints) {
      const { position, type } = rockStartPoint
      let distance = 1
      let fieldsWithDistance = this.fieldsWithDistanceToPoint(position, distance)
      let previousCloserFields
      let closerFields = [rockStartPoint]
      while (fieldsWithDistance.length >= 1) {
        previousCloserFields = closerFields
        closerFields = []
        for (const field of fieldsWithDistance) {
          if (
            Math.random() < chanceForRockContinuation &&
            previousCloserFields.some(mf => fieldsNextToEachOther(mf.position, field))
          ) {
            const mapField = { position: field, type }
            closerFields.push(mapField)
            rockFields.push(mapField)
          }
        }

        distance++
        fieldsWithDistance = this.fieldsWithDistanceToPoint(position, distance)
      }
    }

    for (const { position, type } of rockFields) {
      this.map.grid.set(positionToCell(position), type)
    }
  }

  fieldsWithDistanceToPoint({ x: sx, y: sy }, distance) {
    const fields = []

    const y1 = sy - distance
    if (y1 >= 0 && y1 <= this.map.height - 1) {
      for (let x = Math.max(0, sx - distance); x <= Math.min(this.map.width - 1, sx + distance); x++) {
        fields.push({ x, y: y1 })
      }
    }

    const x2 = sx + distance
    if (x2 >= 0 && x2 <= this.map.width - 1) {
      for (let y = Math.max(0, sy - distance + 1); y <= Math.min(this.map.height - 1, sy + distance - 1); y++) {
        fields.push({ x: x2, y })
      }
    }

    const y3 = sy + distance
    if (y3 >= 0 && y3 <= this.map.height - 1) {
      for (let x = Math.min(this.map.width - 1, sx + distance); x >= Math.max(0, sx - distance - 1); x--) {
        fields.push({ x, y: y3 })
      }
    }

    const x4 = sx - distance
    if (x4 >= 0 && x4 <= this.map.width - 1) {
      for (let y = Math.min(this.map.height - 1, sy + distance - 1); y >= Math.max(0, sy - distance + 1); y--) {
        fields.push({ x: x4, y })
      }
    }

    return fields
  }
}

function positionToCell(position) {
  return {
    row: position.y + 1,
    column: position.x + 1,
  }
}

function fieldsNextToEachOther(a, b) {
  return Math.abs(a.x - b.x) <= 1 && Math.abs(a.y - b.y) <= 1
}

export function displayMap(map) {
  const grid = map.grid
  let output = ''
  for (let y = 0; y < grid.height; y++) {
    for (let x = 0; x < grid.width; x++) {
      const cell = positionToCell({ x, y })
      const ore = grid.get(cell)
      const oreSymbol = ore ? ORE_SYMBOLS[ORES.indexOf(ore)] : ' '
      output += oreSymbol + ' '
    }
    output = output.substr(0, output.length - 1) + '\n'
  }
  output = output.substr(0, output.length - 1)
  console.log(output)
}

const colors = new Map([
  ['Coal', '#686866'],
  ['Gold', 'gold'],
  ['Silver', 'silver'],
  ['Copper', '#b87d6c'],
  ['Iron', '#9c9895'],
])

const defaultColor = 'white'
const cellLength = 16

export function visualizeMap(map) {
  const grid = map.grid
  const canvas = document.createElement('canvas')
  canvas.width = grid.width * cellLength
  canvas.height = grid.height * cellLength
  const context = canvas.getContext('2d')
  for (let y = 0; y < grid.height; y++) {
    for (let x = 0; x < grid.width; x++) {
      const cell = positionToCell({ x, y })
      const ore = grid.get(cell)
      if (ore) {
        const oreColor = colors.get(ore)
        context.fillStyle = oreColor
        context.fillRect(x * cellLength, y * cellLength, cellLength, cellLength)
      }
    }
  }
  return canvas
}
