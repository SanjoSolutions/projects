import {randomInteger} from './randomInteger.js'

export function randomColor() {
    return {hue: randomInteger(0, 359), saturation: 1, lightness: 0.5}
}
