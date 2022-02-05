import { extractPackageFolderName } from './extractPackageFolderName.js';
export function fix(data, path) {
    data = {
        keywords: [],
        license: 'Unlicense',
        ...data,
        homepage: `https://github.com/SanjoSolutions/unnamed/tree/main/packages/${extractPackageFolderName(path)}`,
        repository: {
            type: 'git',
            url: 'https://github.com/SanjoSolutions/unnamed.git',
            directory: `packages/${extractPackageFolderName(path)}`,
        },
    };
    data = Object.entries(data);
    data.sort(compare);
    data = Object.fromEntries(data);
    return data;
}
function compare(a, b) {
    const aValue = determineSortValue(a[0]);
    const bValue = determineSortValue(b[0]);
    return aValue - bValue;
}
const sortOrder = [
    'name',
    'version',
    'type',
    'description',
    'keywords',
    'homepage',
    'license',
    'main',
    'repository',
    'scripts',
    'types',
    'dependencies',
    'devDependencies',
    'types',
    'publishConfig',
];
function determineSortValue(key) {
    const index = sortOrder.indexOf(key);
    return index === -1 ? Number.MAX_SAFE_INTEGER : index;
}
//# sourceMappingURL=fix.js.map