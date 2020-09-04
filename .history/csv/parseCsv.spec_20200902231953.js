import { expect, specification } from '../packages/specification/index.js';

specification(() => {
  const csv = '"aaa","b\r\nbb","ccc"\r\ņzzz,yyy,xxx'
  const data = parseCsv(csv)
  expect(data).toEqual([
    ['aaa', 'b\r\nbb', 'ccc'],
    ['zzz', 'yyy', 'xxx']
  ])
})
