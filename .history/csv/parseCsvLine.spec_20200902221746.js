import { expect, specification } from '../packages/specification/index.js';

specification(() => {
  expect(parseCsvLine('",",')).toEqual([",", ""])
})
