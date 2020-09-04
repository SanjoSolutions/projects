import { expect, specification } from '../packages/specification/index.js';
import { parseCsv, parseCsvLine } from './parseCsv.js';

specification(() => {
  console.log('parseCsv')
  const csv = '"aaa","b\r\nbb","ccc"\r\ņzzz,yyy,xxx'
  const data = parseCsv(csv)
  expect(data).toEqual([
    ['aaa', 'b\r\nbb', 'ccc'],
    ['zzz', 'yyy', 'xxx']
  ])
})

specification(() => {
  console.log('parseCsvLine')
  expect(parseCsvLine('",",')).toEqual([",", ""])
})
