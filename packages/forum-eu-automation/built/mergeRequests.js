"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMergeRequestForTicketNotFoundError = exports.MergeRequests = void 0;
const exec_1 = __importDefault(require("@sanjo/exec"));
const read_json_1 = __importDefault(require("@sanjo/read-json"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const GitLabAPI_1 = require("./GitLabAPI");
const SlackChannelPage_1 = require("./SlackChannelPage");
const SlackLoginPage_1 = require("./SlackLoginPage");
class MergeRequests {
    constructor(configPath) {
        this.#hasBeenInitialized = false;
        this.#config = {
            baseUrl: "",
            gitLabToken: "",
            projectId: "",
            targetBranch: "",
            slackAccount: {
                email: "",
                password: "",
            },
            slackReadyToReviewPostChannelUrl: "",
            slackLoginUrl: "",
        };
        this.#configPath = configPath;
    }
    #hasBeenInitialized;
    #configPath;
    #config;
    async initialize() {
        this.#config = await read_json_1.default(this.#configPath);
        this.#hasBeenInitialized = true;
    }
    async createMRWip(ticketId) {
        this.makeSureThatHasBeenInitialized();
        await this.createMR(ticketId, "wip");
    }
    async createMRReady(ticketId) {
        this.makeSureThatHasBeenInitialized();
        await this.createMR(ticketId, "ready");
    }
    async createMR(ticketId, status) {
        this.makeSureThatHasBeenInitialized();
        await this.pushFeatureBranch(ticketId);
        await this.openMR(ticketId, status);
    }
    async pushFeatureBranch(ticketId) {
        this.makeSureThatHasBeenInitialized();
        const remoteRepository = "origin";
        const branchNames = await this.getBranchNames();
        const localBranchName = this.findBranchNameForTicketId(branchNames, ticketId);
        if (!localBranchName) {
            throw new Error("Feature branch not found.");
        }
        const src = localBranchName;
        const dst = localBranchName;
        const refSpec = `${src}:${dst}`;
        await exec_1.default(`git push '${remoteRepository}' '${refSpec}'`);
    }
    findBranchNameForTicketId(branchNames, ticketId) {
        return this.findBranchNameThatStartsWith(branchNames, `${ticketId}-`);
    }
    findBranchNameThatStartsWith(branchNames, branchNameStart) {
        this.makeSureThatHasBeenInitialized();
        const matchingBranchNames = branchNames.filter((branchName) => branchName.startsWith(branchNameStart));
        if (matchingBranchNames.length > 1) {
            throw new Error(`Multiple branch names found that start with "${branchNameStart}".`);
        }
        else {
            return matchingBranchNames[0] || null;
        }
    }
    async getBranchNames() {
        this.makeSureThatHasBeenInitialized();
        const branches = await this.getBranches();
        const branchNames = branches.map((branch) => branch.name);
        return branchNames;
    }
    async getBranches() {
        this.makeSureThatHasBeenInitialized();
        const { stdout } = await exec_1.default("git branch --list");
        const branchNameRegExp = /^(?:\* )?\s*([^\s]+)$/;
        const branches = stdout.split("\n").map((line) => {
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
    async openMR(ticketId, status) {
        this.makeSureThatHasBeenInitialized();
        const gitLabAPI = this.createGitLabAPI();
        const branchNames = await gitLabAPI.listRepositoryBranches(this.#config.projectId);
        const branchName = this.findBranchNameThatStartsWith(branchNames, ticketId);
        if (branchName) {
            await gitLabAPI.createMergeRequest(this.#config.projectId, {
                sourceBranch: branchName,
                targetBranch: this.#config.targetBranch,
                title: this.generateMRTitle(branchName, status),
            });
        }
        else {
            throw new Error(`Branch name that starts with "${ticketId}" not found.`);
        }
    }
    generateMRTitle(branchName, status) {
        this.makeSureThatHasBeenInitialized();
        switch (status) {
            case "wip":
                return `WIP: ${branchName}`;
            case "ready":
                return branchName;
        }
    }
    async markMRAsReady(ticketId) {
        this.makeSureThatHasBeenInitialized();
        const mergeRequest = await this.getMergeRequestForTicketId(ticketId);
        if (mergeRequest) {
            await this.removeWipFromTitle(ticketId); // Pass merge request?
            await this.postReadyToReviewMessage(ticketId, mergeRequest);
        }
        else {
            throw createMergeRequestForTicketNotFoundError(ticketId);
        }
    }
    async getMergeRequestForTicketId(ticketId) {
        this.makeSureThatHasBeenInitialized();
        const gitLabAPI = this.createGitLabAPI();
        const mergeRequests = await gitLabAPI.listProjectMergeRequests(this.#config.projectId);
        const mergeRequest = this.findMergeRequestForTicketId(mergeRequests, ticketId);
        return mergeRequest;
    }
    findMergeRequestForTicketId(mergeRequests, ticketId) {
        return findStartsWith(mergeRequests, "title", `${ticketId}-`);
    }
    createGitLabAPI() {
        return new GitLabAPI_1.GitLabAPI(this.#config.baseUrl, this.#config.gitLabToken);
    }
    async removeWipFromTitle(ticketId) {
        this.makeSureThatHasBeenInitialized();
        // update mr
    }
    async postReadyToReviewMessage(ticketId, mergeRequest) {
        this.makeSureThatHasBeenInitialized();
        const browser = await puppeteer_1.default.launch();
        const page = await browser.newPage();
        await page.goto(this.#config.slackLoginUrl);
        const slackLoginPage = new SlackLoginPage_1.SlackLoginPage(page);
        await slackLoginPage.login(this.#config.slackAccount.email, this.#config.slackAccount.password);
        await page.goto(this.#config.slackReadyToReviewPostChannelUrl);
        const slackChannelPage = new SlackChannelPage_1.SlackChannelPage(page);
        await slackChannelPage.postMessage(`Merge request “[${mergeRequest.title}](${mergeRequest.url})” ready to be reviewed.`);
    }
    makeSureThatHasBeenInitialized() {
        if (!this.#hasBeenInitialized) {
            throw new Error("MergeRequests needs to be initialized " +
                "by calling the initialize method " +
                "before other methods can be used.");
        }
    }
}
exports.MergeRequests = MergeRequests;
function createMergeRequestForTicketNotFoundError(ticketId) {
    return new Error(`Merge request for ticket id "${ticketId}" not found.`);
}
exports.createMergeRequestForTicketNotFoundError = createMergeRequestForTicketNotFoundError;
function findStartsWith(array, propertyName, startsWithString) {
    return array.find(propertyStartsWith.bind(null, propertyName, startsWithString));
}
function propertyStartsWith(propertyName, startsWithString, object) {
    return object[propertyName].startsWith(startsWithString);
}
//# sourceMappingURL=mergeRequests.js.map