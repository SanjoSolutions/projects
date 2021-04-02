import { getMatchingSubsequences } from "./getMatchingSubsequences.js";

describe("getMatchingSubsequences", () => {
  const testCases = [
    {
      from: [1, 2, 3],
      to: [1, 9, 1, 2, 9, 1, 2, 3],
      expectedResult: [
        [
          { from: 0, to: 3 },
          { from: 5, to: 8 },
        ],
      ],
    },
    {
      from: [1, 2, 9, 3, 4, 5],
      to: [1, 2, 8, 7, 3, 4, 5],
      expectedResult: [
        [
          { from: 0, to: 2 },
          { from: 0, to: 2 },
        ],
        [
          { from: 3, to: 6 },
          { from: 4, to: 7 },
        ],
      ],
    },
    {
      from: [1, 2, 1, 2],
      to: [1, 2],
      expectedResult: [
        [
          { from: 0, to: 2 },
          { from: 0, to: 2 },
        ],
      ],
    },
    {
      from: [1, 1, 1],
      to: [1, 1, 9, 1, 1, 1],
      expectedResult: [
        [
          { from: 0, to: 3 },
          { from: 3, to: 6 },
        ],
      ],
    },
    {
      from: [1, 8],
      to: [1, 9],
      expectedResult: [
        [
          { from: 0, to: 1 },
          { from: 0, to: 1 },
        ],
      ],
    },
    {
      from: [8, 1],
      to: [9, 1],
      expectedResult: [
        [
          { from: 1, to: 2 },
          { from: 1, to: 2 },
        ],
      ],
    },
    {
      from: [6, 1, 7],
      to: [8, 1, 9],
      expectedResult: [
        [
          { from: 1, to: 2 },
          { from: 1, to: 2 },
        ],
      ],
    },
    {
      from: [1],
      to: [2],
      expectedResult: [],
    },
  ];

  for (const { from, to, expectedResult } of testCases) {
    test(
      `gets matching subsequences for from "${JSON.stringify(from)}" ` +
        `and to "${JSON.stringify(to)}" ` +
        `with expected result "${JSON.stringify(expectedResult)}"`,
      () => {
        expect(getMatchingSubsequences(from, to)).toEqual(expectedResult);
      }
    );
  }
});
