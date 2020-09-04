import { expect, specification } from '../packages/specification/index.js';
import { parseCsvLine } from './parseCsvLine.js';

specification(() => {
  expect(parseCsvLine('",",')).toEqual([",", ""])
})
