import { requestJSON } from "@sanjo/request-json"
import { URL } from "url"
import { convertObjectPropertyNamesFromCamelCaseToUnderscore } from "./convertObjectPropertyNamesFromCamelCaseToUnderscore.js"
import type { MergeRequest } from "./MergeRequest.js"

export interface GitLabMergeRequest {
  id: string
  iid: string
  title: string
  web_url: string
}

export class GitLabAPI {
  #baseUrl: string
  #token: string

  constructor(baseUrl: string, token: string) {
    this.#baseUrl = baseUrl
    this.#token = token
  }

  /**
   *
   * @param projectId
   * @see https://docs.gitlab.com/12.10/ee/api/branches.html#list-repository-branches
   */
  async listRepositoryBranches(projectId: string): Promise<string[]> {
    return (await this.request(
      `/projects/${projectId}/repository/branches`,
    )) as string[]
  }

  async listProjectMergeRequests(projectId: string): Promise<MergeRequest[]> {
    const gitLabMergeRequests = await this.request(
      `/projects/${projectId}/merge_requests`,
    )
    const mergeRequests = gitLabMergeRequests.map(
      this.gitLabMergeRequestToMergeRequest.bind(this),
    )
    return mergeRequests
  }

  gitLabMergeRequestToMergeRequest(
    gitLabMergeRequest: GitLabMergeRequest,
  ): MergeRequest {
    return {
      id: gitLabMergeRequest.id,
      iid: gitLabMergeRequest.iid,
      title: gitLabMergeRequest.title,
      url: gitLabMergeRequest.web_url,
    }
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
  async createMergeRequest(
    projectId: string,
    options: { sourceBranch: string; targetBranch: string; title: string },
  ): Promise<void> {
    await this.request(
      `/projects/${projectId}/merge_requests`,
      { method: "POST" },
      options,
    )
  }

  /**
   *
   * @param options
   * @see https://docs.gitlab.com/12.10/ee/api/merge_requests.html#update-mr
   */
  async updateMergeRequest(
    projectId: string,
    mergeRequestId: string,
    options: { title: string },
  ): Promise<void> {
    await this.request(
      `/projects/${projectId}/merge_requests/${mergeRequestId}`,
      { method: "PUT" },
      options,
    )
  }

  private getEndpointUrl(path: string): string {
    return new URL(this.#baseUrl + path).toString()
  }

  private async request(
    path: string,
    options: any = {},
    data?: any,
  ): Promise<any> {
    let endpointURL = this.getEndpointUrl(path)
    if (typeof data === "object") {
      data = convertObjectPropertyNamesFromCamelCaseToUnderscore(data)
    }
    return await requestJSON(endpointURL, options, data ?? "")
  }
}
