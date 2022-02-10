import { requestJSON } from '@sanjo/request-json';
import { URL } from 'url';
import { convertObjectPropertyNamesFromCamelCaseToUnderscore } from './convertObjectPropertyNamesFromCamelCaseToUnderscore.js';
export class GitLabAPI {
    #baseUrl;
    #token;
    constructor(baseUrl, token) {
        this.#baseUrl = baseUrl;
        this.#token = token;
    }
    /**
     *
     * @param projectId
     * @see https://docs.gitlab.com/12.10/ee/api/branches.html#list-repository-branches
     */
    async listRepositoryBranches(projectId) {
        return (await this.request(`/projects/${projectId}/repository/branches`));
    }
    async listProjectMergeRequests(projectId) {
        const gitLabMergeRequests = await this.request(`/projects/${projectId}/merge_requests`);
        const mergeRequests = gitLabMergeRequests.map(this.gitLabMergeRequestToMergeRequest.bind(this));
        return mergeRequests;
    }
    gitLabMergeRequestToMergeRequest(gitLabMergeRequest) {
        return {
            id: gitLabMergeRequest.id,
            iid: gitLabMergeRequest.iid,
            title: gitLabMergeRequest.title,
            url: gitLabMergeRequest.web_url,
        };
    }
    /**
     *
     * @param {string} projectId
     * @param {Object} options
     * @param {string} options.source_branch
     * @param {string} options.target_branch
     * @param {string} options.title
     * @see https://docs.gitlab.com/12.10/ee/api/merge_requests.html#create-mr
     */
    async createMergeRequest(projectId, options) {
        await this.request(`/projects/${projectId}/merge_requests`, { method: 'POST' }, options);
    }
    /**
     *
     * @param options
     * @see https://docs.gitlab.com/12.10/ee/api/merge_requests.html#update-mr
     */
    async updateMergeRequest(projectId, mergeRequestId, options) {
        await this.request(`/projects/${projectId}/merge_requests/${mergeRequestId}`, { method: 'PUT' }, options);
    }
    getEndpointUrl(path) {
        return new URL(this.#baseUrl + path).toString();
    }
    async request(path, options = {}, data) {
        let endpointURL = this.getEndpointUrl(path);
        if (typeof data === 'object') {
            data = convertObjectPropertyNamesFromCamelCaseToUnderscore(data);
        }
        return await requestJSON(endpointURL, options, data ?? '');
    }
}
//# sourceMappingURL=GitLabAPI.js.map