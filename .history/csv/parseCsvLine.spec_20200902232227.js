import { expect, specification } from '../packages/specification/index.js';
import { parseCsvLine } from './parseCsv.js';

specification(() => {
  expect(parseCsvLine('",",')).toEqual([",", ""])
})
