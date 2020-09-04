"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.backup = void 0;
const rsync_1 = require("./rsync");
const rsyncOptions_1 = require("./rsyncOptions");
function backup() {
    rsync_1.rsync(rsyncOptions_1.rsyncOptions);
}
exports.backup = backup;
//# sourceMappingURL=backup.js.map