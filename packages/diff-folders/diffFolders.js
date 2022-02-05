import { readFile } from '@sanjo/read-file';
import { compare as compareDir } from 'dir-compare';
import path from 'path';
// can also use traverseDirectory and then diffArray
export async function diffFolders(folderAPath, folderBPath) {
    const differences = await compareDir(folderAPath, folderBPath, {
        compareContent: true,
        noDiffSet: false,
    });
    return await Promise.all(differences.diffSet.filter(isDifferent).map(transformDifference.bind(null, folderAPath, folderBPath)));
}
function isDifferent(difference) {
    return ['left', 'right', 'distinct'].includes(difference.state);
}
async function transformDifference(folderAPath, folderBPath, difference) {
    if (isAdded(difference)) {
        return {
            type: 'added',
            filePath: path.relative(folderBPath, path.join(difference.path2, difference.name2)),
        };
    }
    else if (isRemove(difference)) {
        return {
            type: 'removed',
            filePath: path.relative(folderAPath, path.join(difference.path1, difference.name1)),
        };
    }
    else if (isDistinct(difference)) {
        const fileAPath = path.join(difference.path1, difference.name1);
        const fileBPath = path.join(difference.path2, difference.name2);
        return {
            type: 'distinct',
            filePath: path.relative(folderAPath, fileAPath),
            contentA: await readFile(fileAPath),
            contentB: await readFile(fileBPath),
        };
    }
    else {
        throw new Error('Unexpected difference: ' + JSON.stringify(difference, null, 2));
    }
}
function isAdded(difference) {
    return difference.state === 'right';
}
function isRemove(difference) {
    return difference.state === 'left';
}
function isDistinct(difference) {
    return difference.state === 'distinct';
}
//# sourceMappingURL=diffFolders.js.map