"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.diffFolders = void 0;
const read_file_1 = __importDefault(require("@sanjo/read-file"));
const dir_compare_1 = require("dir-compare");
const path_1 = __importDefault(require("path"));
// can also use traverseDirectory and then diffArray
async function diffFolders(folderAPath, folderBPath) {
    const differences = await dir_compare_1.compare(folderAPath, folderBPath, {
        compareContent: true,
        noDiffSet: false,
    });
    return await Promise.all(differences.diffSet
        .filter(isDifferent)
        .map(transformDifference.bind(null, folderAPath, folderBPath)));
}
exports.diffFolders = diffFolders;
function isDifferent(difference) {
    return ['left', 'right', 'distinct'].includes(difference.state);
}
async function transformDifference(folderAPath, folderBPath, difference) {
    if (isAdded(difference)) {
        return {
            type: 'added',
            filePath: path_1.default.relative(folderBPath, path_1.default.join(difference.path2, difference.name2)),
        };
    }
    else if (isRemove(difference)) {
        return {
            type: 'removed',
            filePath: path_1.default.relative(folderAPath, path_1.default.join(difference.path1, difference.name1)),
        };
    }
    else if (isDistinct(difference)) {
        const fileAPath = path_1.default.join(difference.path1, difference.name1);
        const fileBPath = path_1.default.join(difference.path2, difference.name2);
        return {
            type: 'distinct',
            filePath: path_1.default.relative(folderAPath, fileAPath),
            contentA: await read_file_1.default(fileAPath),
            contentB: await read_file_1.default(fileBPath),
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