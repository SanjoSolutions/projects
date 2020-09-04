export declare const baseUrl = "https://git.forum.engineering/api/v4";
export declare const gitLabToken = "tE4B3aKudEnAxcuvjQxz";
export declare const projectId = "5";
export declare const targetBranch = "dev";
export declare function createPRWip(ticketId: string): Promise<void>;
export declare function createPRReady(ticketId: string): Promise<void>;
export declare type Status = 'wip' | 'ready';
export declare function createPR(ticketId: string, status: Status): Promise<void>;
export declare function pushFeatureBranch(ticketId: string): Promise<void>;
export declare function findBranchNameThatStartsWith(branchNames: string[], branchNameStart: string): string | null;
export declare function getBranchNames(): Promise<string[]>;
export declare function getBranches(): Promise<{
    name: string;
}[]>;
export declare function openPR(ticketId: string, status: Status): Promise<void>;
export declare function generatePRTitle(branchName: string, status: Status): string;
export declare function markPRAsReady(ticketId: string): Promise<void>;
//# sourceMappingURL=pr.d.ts.map