import { equals } from "../equals.js";
import { expect, specification } from "../packages/specification/index.js";
import { OrePlacer2, OresMap } from "./index.js";

specification(() => {
  const map = new OresMap(3, 3);
  const orePlacer = new OrePlacer2(map);
  const fields = orePlacer.fieldsWithDistanceToPoint({ x: 1, y: 1 }, 1);
  const expectedFields = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 2, y: 1 },
    { x: 2, y: 2 },
    { x: 1, y: 2 },
    { x: 0, y: 2 },
    { x: 0, y: 1 },
  ];
  const doesEqual = equals(fields, expectedFields);
  console.log(fields);
  console.log(expectedFields);
  console.log(doesEqual);
  expect(doesEqual).toEqual(true);
});

specification(() => {
  const map = new OresMap(1, 1);
  const orePlacer = new OrePlacer2(map);
  const fields = orePlacer.fieldsWithDistanceToPoint({ x: 0, y: 0 }, 1);
  const expectedFields = [];
  const doesEqual = equals(fields, expectedFields);
  console.log(fields);
  console.log(expectedFields);
  console.log(doesEqual);
  expect(doesEqual).toEqual(true);
});
