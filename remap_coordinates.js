const input = {
    polygon: [
        {
            "x": "332.97",
            "y": "243.38"
        },
        {
            "x": "369.46",
            "y": "243.38"
        },
        {
            "x": "369.46",
            "y": "251.72"
        },
        {
            "x": "332.97",
            "y": "251.72"
        }
    ],
    fromViewport: {
        width: 456,
        height: 591
    },
    toViewport: {
        width: 600,
        height: 800
    }
}
const digitsAfterComma = 8
console.log(transformRounded(input, digitsAfterComma))
// Without rounding:
// console.log(transform(input))

function transformRounded(input, digitsAfterComma) {
    const result = transform(input)
    return Object.fromEntries(
        Object.entries(result).map(
            ([key, value]) => ([key, round(value, digitsAfterComma)])
        )
    )
}

function transform(input) {
    const scaleX = input.toViewport.width / input.fromViewport.width
    const scaleY = input.toViewport.height / input.fromViewport.height
    const points = input.polygon.map(({x, y}) => ({
        x: scaleX * x,
        y: scaleY * y
    }))
    const minX = Math.min(...points.map(({x}) => x))
    const maxX = Math.max(...points.map(({x}) => x))
    const minY = Math.min(...points.map(({y}) => y))
    const maxY = Math.max(...points.map(({y}) => y))
    return {
        top: minY,
        left: minX,
        width: maxX - minX,
        height: maxY - minY,
        bottom: maxY,
        right: maxX
    }
}

function round(value, digitsAfterComma) {
    const shiftValue = (10 ** digitsAfterComma)
    return Math.round(value * shiftValue) / shiftValue
}
