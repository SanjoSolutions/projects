"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitLabAPI = void 0;
const request_json_1 = __importDefault(require("@sanjo/request-json"));
const url_1 = require("url");
const convertObjectPropertyNamesFromCamelCaseToUnderscore_1 = require("./convertObjectPropertyNamesFromCamelCaseToUnderscore");
class GitLabAPI {
    constructor(baseUrl, token) {
        this.#baseUrl = baseUrl;
        this.#token = token;
    }
    #baseUrl;
    #token;
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
        await this.request(`/projects/${projectId}/merge_requests`, { method: "POST" }, options);
    }
    /**
     *
     * @param options
     * @see https://docs.gitlab.com/12.10/ee/api/merge_requests.html#update-mr
     */
    async updateMergeRequest(projectId, mergeRequestId, options) {
        await this.request(`/projects/${projectId}/merge_requests/${mergeRequestId}`, { method: "PUT" }, options);
    }
    getEndpointUrl(path) {
        return new url_1.URL(this.#baseUrl + path).toString();
    }
    async request(path, options = {}, data) {
        let endpointURL = this.getEndpointUrl(path);
        if (typeof data === "object") {
            data = convertObjectPropertyNamesFromCamelCaseToUnderscore_1.convertObjectPropertyNamesFromCamelCaseToUnderscore(data);
        }
        return await request_json_1.default(endpointURL, options, data ?? "");
    }
}
exports.GitLabAPI = GitLabAPI;
//# sourceMappingURL=GitLabAPI.js.map