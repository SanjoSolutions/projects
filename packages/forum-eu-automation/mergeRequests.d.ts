import { GitLabAPI } from './GitLabAPI.js';
import type { MergeRequest } from './MergeRequest.js';
export type Status = 'wip' | 'ready';
export interface Config {
    baseUrl: string;
    gitLabToken: string;
    projectId: string;
    targetBranch: string;
    slackAccount: SlackAccountCredentials;
    slackReadyToReviewPostChannelUrl: string;
    slackLoginUrl: string;
}
export interface SlackAccountCredentials {
    email: string;
    password: string;
}
export declare class MergeRequests {
    #private;
    constructor(configPath: string);
    initialize(): Promise<void>;
    createMRWip(ticketId: string): Promise<void>;
    createMRReady(ticketId: string): Promise<void>;
    createMR(ticketId: string, status: Status): Promise<void>;
    pushFeatureBranch(ticketId: string): Promise<void>;
    findBranchNameForTicketId(branchNames: string[], ticketId: string): string | null;
    findBranchNameThatStartsWith(branchNames: string[], branchNameStart: string): string | null;
    getBranchNames(): Promise<string[]>;
    getBranches(): Promise<{
        name: string;
    }[]>;
    openMR(ticketId: string, status: Status): Promise<void>;
    generateMRTitle(branchName: string, status: Status): string;
    markMRAsReady(ticketId: string): Promise<void>;
    getMergeRequestForTicketId(ticketId: string): Promise<MergeRequest | null>;
    findMergeRequestForTicketId(mergeRequests: MergeRequest[], ticketId: string): MergeRequest | null;
    createGitLabAPI(): GitLabAPI;
    removeWipFromTitle(ticketId: string): Promise<void>;
    postReadyToReviewMessage(ticketId: string, mergeRequest: MergeRequest): Promise<void>;
    private makeSureThatHasBeenInitialized;
}
export declare function createMergeRequestForTicketNotFoundError(ticketId: string): Error;
//# sourceMappingURL=mergeRequests.d.ts.map