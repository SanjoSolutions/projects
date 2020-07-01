jest.mock('@sanjo/request-json')

import requestJSON from '@sanjo/request-json'
import { GitLabAPI } from './GitLabAPI'
import { createMergeRequest } from './testing/fixtures/gitLabAPI/gitlab/createMergeRequest'

// TODO: Way to get merge request id for ticketId
//   Maybe just stored it when getting it from createMergeRequest response
//   GET /merge_requests?search=foo&in=title (see https://docs.gitlab.com/12.10/ee/api/merge_requests.html#list-merge-requests)
//     works for when merge request has not been created by tool
//       for mark merge request as ready

describe('GitLabAPI', () => {
  const projectId = '1'
  const baseURL = 'http://example.com/api/v4'
  const token = ''
  let gitLabAPI: GitLabAPI

  beforeEach(function () {
    gitLabAPI = new GitLabAPI(baseURL, token)
  })

  describe('listRepositoryBranches', () => {
    it('lists repository branches', async () => {
      const branches = [
          {
            name: 'master',
          },
          {
            name: 'develop',
          },
          {
            name: '1-feature',
          },
        ]
      ;(
        requestJSON as jest.Mock<any, any>
      ).mockResolvedValue(branches)
      const response = await gitLabAPI.listRepositoryBranches(projectId)
      expect(response).toEqual(branches)
    })
  })

  describe('listProjectMergeRequests', () => {
    it('lists merge requests', async () => {
      const gitLabMergeRequests = [createMergeRequest()]
      ;(
        requestJSON as jest.Mock<any, any>
      ).mockResolvedValue(gitLabMergeRequests)
      const mergeRequests = await gitLabAPI.listProjectMergeRequests(projectId)
      expect(mergeRequests).toEqual([
        {
          id: 1, // ?
          iid: 1, // ?
          title: '1-feature',
          url: 'https://www.example.com/groupName/repositoryName/-/merge_requests/1',
        },
      ])
    })
  })

  describe('createMergeRequest', () => {
    it('creates a merge request', async () => {
      const options = {
        sourceBranch: '1-feature',
        targetBranch: 'dev',
        title: '1-feature',
      }
      const response = await gitLabAPI.createMergeRequest(projectId, options)
      expect(requestJSON).toHaveBeenCalledWith(
        `${baseURL}/projects/${projectId}/merge_requests`,
        {
          method: 'POST',
        },
        {
          source_branch: '1-feature',
          target_branch: 'dev',
          title: '1-feature',
        },
      )
    })
  })

  describe('updateMergeRequest', () => {
    it('updates a merge request', async () => {
      const options = {
        title: '1-feature',
      }
      const mergeRequestId = '2'
      const response = await gitLabAPI.updateMergeRequest(
        projectId,
        mergeRequestId,
        options,
      )
      expect(requestJSON).toHaveBeenCalledWith(
        `${baseURL}/projects/${projectId}/merge_requests/${mergeRequestId}`,
        {
          method: 'PUT',
        },
        {
          title: '1-feature',
        },
      )
    })
  })
})
