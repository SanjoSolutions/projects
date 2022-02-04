import escapeForRegExp from '@sanjo/escape-for-reg-exp';
import readFile from '@sanjo/read-file';
import { writeFile } from '@sanjo/write-file';
export async function replaceStringInFile(filePath, stringToReplace, stringToReplaceWith) {
    let content = await readFile(filePath);
    content = content.replace(new RegExp(escapeForRegExp(stringToReplace), 'g'), stringToReplaceWith);
    await writeFile(filePath, content);
}
//# sourceMappingURL=replaceStringInFile.js.map