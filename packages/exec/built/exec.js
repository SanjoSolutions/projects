"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exec = void 0;
const child_process_1 = __importDefault(require("child_process"));
async function exec(command, options = {}) {
    return new Promise((resolve, reject) => {
        child_process_1.default.exec(command, options, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            }
            else {
                resolve({ stdout, stderr });
            }
        });
    });
}
exports.exec = exec;
//# sourceMappingURL=exec.js.map