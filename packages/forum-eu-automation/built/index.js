"use strict";
// curl --header "PRIVATE-TOKEN: tE4B3aKudEnAxcuvjQxz" https://git.forum.engineering/api/v4/projects/5/repository/branches
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const mergeRequests_js_1 = require("./mergeRequests.js");
async function main() {
    const args = process.argv.slice(2);
    const command = args[0];
    const home = process.env.HOME || "~";
    const configPath = path_1.default.join(home, "forum-eu-automation.config.json");
    const mergeRequests = new mergeRequests_js_1.MergeRequests(configPath);
    await mergeRequests.initialize();
    switch (command) {
        case "create-pr":
            await createMR(mergeRequests, args);
            break;
        case "mark-pr-as-ready":
            await markMRAsReady(mergeRequests, args);
            break;
    }
}
async function createMR(mergeRequests, args) {
    const status = args[1];
    if (!["wip", "ready"].includes(status)) {
        throw new Error(`Invalid status: "${status}"`);
    }
    const ticketId = args[2];
    await mergeRequests.createMR(ticketId, status);
}
async function markMRAsReady(mergeRequests, args) {
    const ticketId = args[1];
    await mergeRequests.markMRAsReady(ticketId);
}
main().catch(console.error);
//# sourceMappingURL=index.js.map