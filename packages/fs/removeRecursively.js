import fs from 'fs/promises';
export async function removeRecursively(path, options) {
    await fs.rm(path, {
        maxRetries: 3,
        ...options,
        recursive: true,
    });
}
//# sourceMappingURL=removeRecursively.js.map