"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markPRAsReady = exports.generatePRTitle = exports.openPR = exports.getBranches = exports.getBranchNames = exports.findBranchNameThatStartsWith = exports.pushFeatureBranch = exports.createPR = exports.createPRReady = exports.createPRWip = exports.targetBranch = exports.projectId = exports.gitLabToken = exports.baseUrl = void 0;
const child_process_1 = __importDefault(require("child_process"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const GitLabAPI_1 = require("./GitLabAPI");
const SlackChannelPage_1 = require("./SlackChannelPage");
exports.baseUrl = 'https://git.forum.engineering/api/v4';
exports.gitLabToken = 'tE4B3aKudEnAxcuvjQxz';
exports.projectId = '5';
exports.targetBranch = 'dev';
async function createPRWip(ticketId) {
    await createPR(ticketId, 'wip');
}
exports.createPRWip = createPRWip;
async function createPRReady(ticketId) {
    await createPR(ticketId, 'ready');
}
exports.createPRReady = createPRReady;
async function createPR(ticketId, status) {
    await pushFeatureBranch(ticketId);
    await openPR(ticketId, status);
}
exports.createPR = createPR;
async function pushFeatureBranch(ticketId) {
    const remoteRepository = 'origin';
    const branchNames = await getBranchNames();
    const localBranchName = await findBranchNameThatStartsWith(branchNames, `${ticketId}-`);
    if (!localBranchName) {
        throw new Error('Feature branch not found.');
    }
    const src = localBranchName;
    const dst = localBranchName;
    const refSpec = `${src}:${dst}`;
    await exec(`git push '${remoteRepository}' '${refSpec}'`);
}
exports.pushFeatureBranch = pushFeatureBranch;
function findBranchNameThatStartsWith(branchNames, branchNameStart) {
    const matchingBranchNames = branchNames.filter(branchName => branchName.startsWith(branchNameStart));
    if (matchingBranchNames.length > 1) {
        throw new Error(`Multiple branch names found that start with "${branchNameStart}".`);
    }
    else {
        return matchingBranchNames[0] || null;
    }
}
exports.findBranchNameThatStartsWith = findBranchNameThatStartsWith;
async function getBranchNames() {
    const branches = await getBranches();
    const branchNames = branches.map(branch => branch.name);
    return branchNames;
}
exports.getBranchNames = getBranchNames;
async function getBranches() {
    const { stdout } = await exec('git branch --list');
    const branchNameRegExp = /^(?:\* )?\s*([^\s]+)$/;
    const branches = stdout.split('\n').map(line => {
        const match = branchNameRegExp.exec(line);
        if (match) {
            return { name: match[1] };
        }
        else {
            throw new Error(`line "${line}" did not match the regular expression for a branch name.`);
        }
    });
    return branches;
}
exports.getBranches = getBranches;
async function openPR(ticketId, status) {
    // Maybe with API :-)
    const gitLabAPI = new GitLabAPI_1.GitLabAPI(exports.baseUrl, exports.gitLabToken);
    const branchNames = await gitLabAPI.listRepositoryBranches(exports.projectId);
    const branchName = findBranchNameThatStartsWith(branchNames, ticketId);
    if (branchName) {
        await gitLabAPI.createMergeRequest(exports.projectId, {
            sourceBranch: branchName,
            targetBranch: exports.targetBranch,
            title: generatePRTitle(branchName, status),
        });
    }
    else {
        throw new Error(`Branch name that starts with "${ticketId}" not found.`);
    }
}
exports.openPR = openPR;
function generatePRTitle(branchName, status) {
    switch (status) {
        case 'wip':
            return `WIP: ${branchName}`;
        case 'ready':
            return branchName;
    }
}
exports.generatePRTitle = generatePRTitle;
async function markPRAsReady(ticketId) {
    await removeWipFromTitle(ticketId);
    await postReadyToReviewMessage(ticketId);
}
exports.markPRAsReady = markPRAsReady;
async function removeWipFromTitle(ticketId) {
    // update mr
}
async function postReadyToReviewMessage(ticketId) {
    // post to Slack
    //  url: https://app.slack.com/client/TFH0Z63QC/CMJTT721X
    //  login
    //  post: PR: “[<PR title>](<PR url>)” ready to be reviewed.
    //    link with: Cmd + Shift + U --> Enter URL --> Press Enter
    // With puppeteer
    const browser = await puppeteer_1.default.launch();
    const page = await browser.newPage();
    const slackChannelPage = new SlackChannelPage_1.SlackChannelPage(page);
}
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
//# sourceMappingURL=pr.js.map