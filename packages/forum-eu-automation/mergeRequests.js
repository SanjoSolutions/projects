import exec from '@sanjo/exec';
import { readJSON } from '@sanjo/read-json';
import puppeteer from 'puppeteer';
import { GitLabAPI } from './GitLabAPI.js';
import { SlackChannelPage } from './SlackChannelPage.js';
import { SlackLoginPage } from './SlackLoginPage.js';
export class MergeRequests {
    #hasBeenInitialized = false;
    #configPath;
    #config = {
        baseUrl: '',
        gitLabToken: '',
        projectId: '',
        targetBranch: '',
        slackAccount: {
            email: '',
            password: '',
        },
        slackReadyToReviewPostChannelUrl: '',
        slackLoginUrl: '',
    };
    constructor(configPath) {
        this.#configPath = configPath;
    }
    async initialize() {
        this.#config = await readJSON(this.#configPath);
        this.#hasBeenInitialized = true;
    }
    async createMRWip(ticketId) {
        this.makeSureThatHasBeenInitialized();
        await this.createMR(ticketId, 'wip');
    }
    async createMRReady(ticketId) {
        this.makeSureThatHasBeenInitialized();
        await this.createMR(ticketId, 'ready');
    }
    async createMR(ticketId, status) {
        this.makeSureThatHasBeenInitialized();
        await this.pushFeatureBranch(ticketId);
        await this.openMR(ticketId, status);
    }
    async pushFeatureBranch(ticketId) {
        this.makeSureThatHasBeenInitialized();
        const remoteRepository = 'origin';
        const branchNames = await this.getBranchNames();
        const localBranchName = this.findBranchNameForTicketId(branchNames, ticketId);
        if (!localBranchName) {
            throw new Error('Feature branch not found.');
        }
        const src = localBranchName;
        const dst = localBranchName;
        const refSpec = `${src}:${dst}`;
        await exec(`git push '${remoteRepository}' '${refSpec}'`);
    }
    findBranchNameForTicketId(branchNames, ticketId) {
        return this.findBranchNameThatStartsWith(branchNames, `${ticketId}-`);
    }
    findBranchNameThatStartsWith(branchNames, branchNameStart) {
        this.makeSureThatHasBeenInitialized();
        const matchingBranchNames = branchNames.filter(branchName => branchName.startsWith(branchNameStart));
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
        const branchNames = branches.map(branch => branch.name);
        return branchNames;
    }
    async getBranches() {
        this.makeSureThatHasBeenInitialized();
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
            case 'wip':
                return `WIP: ${branchName}`;
            case 'ready':
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
        return findStartsWith(mergeRequests, 'title', `${ticketId}-`);
    }
    createGitLabAPI() {
        return new GitLabAPI(this.#config.baseUrl, this.#config.gitLabToken);
    }
    async removeWipFromTitle(ticketId) {
        this.makeSureThatHasBeenInitialized();
        // update mr
    }
    async postReadyToReviewMessage(ticketId, mergeRequest) {
        this.makeSureThatHasBeenInitialized();
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(this.#config.slackLoginUrl);
        const slackLoginPage = new SlackLoginPage(page);
        await slackLoginPage.login(this.#config.slackAccount.email, this.#config.slackAccount.password);
        await page.goto(this.#config.slackReadyToReviewPostChannelUrl);
        const slackChannelPage = new SlackChannelPage(page);
        await slackChannelPage.postMessage(`Merge request “[${mergeRequest.title}](${mergeRequest.url})” ready to be reviewed.`);
    }
    makeSureThatHasBeenInitialized() {
        if (!this.#hasBeenInitialized) {
            throw new Error('MergeRequests needs to be initialized ' +
                'by calling the initialize method ' +
                'before other methods can be used.');
        }
    }
}
export function createMergeRequestForTicketNotFoundError(ticketId) {
    return new Error(`Merge request for ticket id "${ticketId}" not found.`);
}
function findStartsWith(array, propertyName, startsWithString) {
    return array.find(propertyStartsWith.bind(null, propertyName, startsWithString));
}
function propertyStartsWith(propertyName, startsWithString, object) {
    return object[propertyName].startsWith(startsWithString);
}
//# sourceMappingURL=mergeRequests.js.map