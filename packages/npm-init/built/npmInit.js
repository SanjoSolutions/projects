"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.npmInit = void 0;
const exec_1 = __importDefault(require("@sanjo/exec"));
async function npmInit(rootPath, createPackageName, args) {
    let command = `npx '${createPackageName}'`;
    const argsString = args.map(arg => `'${arg}'`).join(' ');
    if (argsString.length >= 1) {
        command += ` ${argsString}`;
    }
    console.log(`exec: ${command}, cwd: ${rootPath}`);
    const { stdout, stderr } = await exec_1.default(command, { cwd: rootPath });
    if (stdout) {
        console.log('stdout: ' + stdout);
    }
    if (stderr) {
        console.error('stderr: ' + stderr);
    }
}
exports.npmInit = npmInit;
//# sourceMappingURL=npmInit.js.map