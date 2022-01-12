import path from 'path';
import { diffFolders } from './diffFolders.js';
describe('diffFolder', () => {
    const testCases = [
        {
            name: 'equal',
            expectedResult: [],
        },
        {
            name: 'added',
            expectedResult: [
                {
                    type: 'added',
                    filePath: 'test.json',
                },
            ],
        },
        {
            name: 'removed',
            expectedResult: [
                {
                    type: 'removed',
                    filePath: 'test.json',
                },
            ],
        },
        {
            name: 'distinct',
            expectedResult: [
                {
                    type: 'distinct',
                    filePath: 'test.json',
                    contentA: `{
  "name": "a"
}
`,
                    contentB: `{
  "name": "b"
}
`,
                },
            ],
        },
    ];
    for (const { name, expectedResult } of testCases) {
        it(name, async () => {
            const fixturesPath = path.resolve(__dirname, '__tests__/fixtures/');
            const fixturesExamplePath = path.join(fixturesPath, name);
            const folderPathA = path.join(fixturesExamplePath, 'folderA');
            const folderPathB = path.join(fixturesExamplePath, 'folderB');
            const differences = await diffFolders(folderPathA, folderPathB);
            expect(differences).toEqual(expectedResult);
        });
    }
});
//# sourceMappingURL=diffFolders.spec.js.map