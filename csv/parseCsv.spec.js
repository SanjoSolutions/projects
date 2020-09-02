import { expect, specification } from '../packages/specification/index.js';
import { parseCsv, parseCsvLine } from './parseCsv.js';

specification('parseCsv', () => {
  const csv = '"aaa","b\r\nbb","ccc"\r\nzzz,yyy,xxx'
  const data = parseCsv(csv)
  expect(data).toEqual([
    ['aaa', 'b\r\nbb', 'ccc'],
    ['zzz', 'yyy', 'xxx']
  ])
})

specification('parseCsvLine', () => {
  expect(parseCsvLine('",",')).toEqual([",", ""])
})
