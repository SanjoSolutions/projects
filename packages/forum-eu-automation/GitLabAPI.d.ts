import type { MergeRequest } from './MergeRequest.js';
export interface GitLabMergeRequest {
    id: string;
    iid: string;
    title: string;
    web_url: string;
}
export declare class GitLabAPI {
    #private;
    constructor(baseUrl: string, token: string);
    /**
     *
     * @param projectId
     * @see https://docs.gitlab.com/12.10/ee/api/branches.html#list-repository-branches
     */
    listRepositoryBranches(projectId: string): Promise<string[]>;
    listProjectMergeRequests(projectId: string): Promise<MergeRequest[]>;
    gitLabMergeRequestToMergeRequest(gitLabMergeRequest: GitLabMergeRequest): MergeRequest;
    /**
     *
     * @param {string} projectId
     * @param {Object} options
     * @param {string} options.source_branch
     * @param {string} options.target_branch
     * @param {string} options.title
     * @see https://docs.gitlab.com/12.10/ee/api/merge_requests.html#create-mr
     */
    createMergeRequest(projectId: string, options: {
        sourceBranch: string;
        targetBranch: string;
        title: string;
    }): Promise<void>;
    /**
     *
     * @param options
     * @see https://docs.gitlab.com/12.10/ee/api/merge_requests.html#update-mr
     */
    updateMergeRequest(projectId: string, mergeRequestId: string, options: {
        title: string;
    }): Promise<void>;
    private getEndpointUrl;
    private request;
}
//# sourceMappingURL=GitLabAPI.d.ts.map