import { Grid } from './Grid.js';
import { expect, specification } from './packages/specification/index.js';

specification(() => {
  const grid = new Grid([3, 3, 3])
  const entries = grid.entries()
  expect(entries).toEqual([
    [[0, 0, 0], undefined],
    [[1, 0, 0], undefined],
    [[2, 0, 0], undefined],
    [[0, 1, 0], undefined],
    [[1, 1, 0], undefined],
    [[2, 1, 0], undefined],
    [[0, 2, 0], undefined],
    [[1, 2, 0], undefined],
    [[2, 2, 0], undefined],
    [[0, 0, 1], undefined],
    [[1, 0, 1], undefined],
    [[2, 0, 1], undefined],
    [[0, 1, 1], undefined],
    [[1, 1, 1], undefined],
    [[2, 1, 1], undefined],
    [[0, 2, 1], undefined],
    [[1, 2, 1], undefined],
    [[2, 2, 1], undefined],
    [[0, 0, 2], undefined],
    [[1, 0, 2], undefined],
    [[2, 0, 2], undefined],
    [[0, 1, 2], undefined],
    [[1, 1, 2], undefined],
    [[2, 1, 2], undefined],
    [[0, 2, 2], undefined],
    [[1, 2, 2], undefined],
    [[2, 2, 2], undefined],
  ])
})
