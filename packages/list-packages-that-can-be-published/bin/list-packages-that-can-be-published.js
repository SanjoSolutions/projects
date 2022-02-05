import { readFile } from '@sanjo/read-file';
import { readdir } from 'fs/promises';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import compare from 'semver-compare';
import { exec } from '@sanjo/exec';
const __dirname = dirname(fileURLToPath(import.meta.url));
const basePath = resolve(__dirname, '../..');
const packageFolderNames = await readDirectoriesFromDirectory(basePath);
const result = await Promise.allSettled(packageFolderNames.map(async (packageFolderName) => {
    let name = null;
    let canBePublished = null;
    try {
        const path = join(basePath, packageFolderName);
        const packageJSONPath = join(path, 'package.json');
        const data = JSON.parse(await readFile(packageJSONPath));
        name = data.name;
        const version = data.version;
        if (version) {
            let lastPublishedVersion = null;
            try {
                const { stdout: output } = await exec('npm show --json ' + name);
                const info = JSON.parse(output);
                lastPublishedVersion = info.version || null;
            }
            catch (error) {
                if (error.message.includes('404')) {
                    lastPublishedVersion = null;
                }
                else {
                    throw error;
                }
            }
            canBePublished = !lastPublishedVersion || compare(lastPublishedVersion, version) === -1;
        }
    }
    catch (error) {
        if (error.code !== 'ENOENT') {
            throw error;
        }
    }
    return {
        name,
        canBePublished,
    };
}));
const packagesThatCanBePublished = result.filter(result => result.status === 'fulfilled' && result.value.name && result.value.canBePublished);
const packageNamesThatCanBePublished = packagesThatCanBePublished.map(result => result.value.name);
console.log('Packages that can be published:');
for (const name of packageNamesThatCanBePublished) {
    console.log('  * ' + name);
}
async function readDirectoriesFromDirectory(path) {
    return (await readdir(path, { withFileTypes: true })).filter(entry => entry.isDirectory()).map(entry => entry.name);
}
//# sourceMappingURL=list-packages-that-can-be-published.js.map