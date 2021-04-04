import readJSON from "@sanjo/read-json";
import type { ChildProcess, ExecException } from "child_process";
import child_process from "child_process";
import { GitLabAPI } from "./GitLabAPI.js";
import type { MergeRequest } from "./MergeRequest.js";
import {
  createMergeRequestForTicketNotFoundError,
  MergeRequests,
} from "./mergeRequests.js";
import { createMergeRequest } from "./testing/fixtures/gitLabAPI/createMergeRequest.js";

jest.mock("@sanjo/read-json");
jest.mock("child_process");
jest.mock("puppeteer");

function spyOnExec(branches: string): void {
  jest
    .spyOn(child_process, "exec")
    .mockImplementation(
      (
        command: string,
        options: any,
        callback:
          | ((
              error: ExecException | null,
              stdout: string,
              stderr: string
            ) => void)
          | undefined
      ) => {
        if (!callback) {
          throw new Error("Expected callback");
        }
        if (command === "git branch --list") {
          callback(null, branches, "");
        } else if (command.startsWith("git push")) {
          callback(null, "", "");
        } else {
          callback(new Error(`Unexpected command: "${command}"`), "", "");
        }
        return {} as ChildProcess;
      }
    );
}

describe("MergeRequests", () => {
  let mergeRequests: MergeRequests;
  const projectId = "5";
  const targetBranch = "dev";

  beforeEach(async function () {
    mergeRequests = new MergeRequests("");
    (readJSON as jest.Mock).mockResolvedValueOnce({
      baseUrl: "https://www.example.com/api/v4",
      gitLabToken: "",
      projectId,
      targetBranch,
      slackAccount: {
        email: "",
        password: "",
      },
      slackReadyToReviewPostChannelUrl: "",
      slackLoginUrl: "",
    });
    await mergeRequests.initialize();
  });

  describe("pushFeatureBranch", () => {
    it("pushes the feature branch with the given ticketId", async () => {
      spyOnExec("* develop\n  master\n  1-feature");
      const ticketId = "1";
      await mergeRequests.pushFeatureBranch(ticketId);
      expect(child_process.exec).toHaveBeenCalledWith(
        "git push 'origin' '1-feature:1-feature'",
        expect.anything(),
        expect.anything()
      );
    });

    it("throws an error when the feature branch has not been found", async () => {
      spyOnExec("* develop\n  master");
      const ticketId = "1";
      await expect(mergeRequests.pushFeatureBranch(ticketId)).rejects.toEqual(
        new Error("Feature branch not found.")
      );
    });
  });

  describe("getBranchNameThatStartsWith", () => {
    it("returns the git branch name that starts with", () => {
      const branchNames = ["develop", "master", "1-feature"];
      expect(
        mergeRequests.findBranchNameThatStartsWith(branchNames, "1-")
      ).toEqual("1-feature");
    });

    it("throws an error when multiple branch names have been found that start with", () => {
      const branchNames = [
        "develop",
        "master",
        "1-feature",
        "1-2-feature-addition",
      ];
      expect(() =>
        mergeRequests.findBranchNameThatStartsWith(branchNames, "1-")
      ).toThrow(new Error('Multiple branch names found that start with "1-".'));
    });
  });

  describe("getBranchNames", () => {
    it("returns the branch names", async () => {
      spyOnExec("* develop\n  master");
      expect(await mergeRequests.getBranchNames()).toEqual([
        "develop",
        "master",
      ]);
    });
  });

  describe("getBranches", () => {
    it("returns the branches", async () => {
      spyOnExec("* develop\n  master");
      expect(await mergeRequests.getBranches()).toEqual([
        { name: "develop" },
        { name: "master" },
      ]);
    });
  });

  describe("openMR", () => {
    it("opens a MR on GitLab", async () => {
      jest
        .spyOn(GitLabAPI.prototype, "listRepositoryBranches")
        .mockResolvedValue(["1-feature"]);
      jest.spyOn(GitLabAPI.prototype, "createMergeRequest").mockResolvedValue();
      const ticketId = "1";
      const status = "wip";
      await mergeRequests.openMR(ticketId, status);
      expect(GitLabAPI.prototype.createMergeRequest).toHaveBeenCalledWith(
        projectId,
        {
          sourceBranch: "1-feature",
          targetBranch: targetBranch,
          title: "WIP: 1-feature",
        }
      );
    });
  });

  describe("generateMRTitle", () => {
    test('status: "wip"', () => {
      const branchName = "1-feature";
      expect(mergeRequests.generateMRTitle(branchName, "wip")).toEqual(
        `WIP: ${branchName}`
      );
    });

    test('status: "ready"', () => {
      const branchName = "1-feature";
      expect(mergeRequests.generateMRTitle(branchName, "ready")).toEqual(
        branchName
      );
    });
  });

  describe("markMRAsReady", () => {
    let mergeRequest: MergeRequest;
    const ticketId = "1";

    beforeEach(function () {
      mergeRequest = createMergeRequest();
      jest
        .spyOn(mergeRequests, "getMergeRequestForTicketId")
        .mockResolvedValue(mergeRequest);
      jest
        .spyOn(mergeRequests, "removeWipFromTitle")
        .mockResolvedValue(undefined);
      jest
        .spyOn(mergeRequests, "postReadyToReviewMessage")
        .mockResolvedValue(undefined);
    });

    it("removes wip from title", async () => {
      await mergeRequests.markMRAsReady(ticketId);
      expect(mergeRequests.removeWipFromTitle).toHaveBeenCalledWith(ticketId);
    });

    it("posts ready to review message", async () => {
      await mergeRequests.markMRAsReady(ticketId);
      expect(mergeRequests.postReadyToReviewMessage).toHaveBeenCalledWith(
        ticketId,
        mergeRequest
      );
    });

    it("throws an error when the merge request has not been found for the ticket id", async () => {
      (mergeRequests.getMergeRequestForTicketId as jest.Mock).mockResolvedValue(
        null
      );
      await expect(mergeRequests.markMRAsReady(ticketId)).rejects.toEqual(
        createMergeRequestForTicketNotFoundError(ticketId)
      );
    });
  });

  describe("getMergeRequestForTicketId", () => {
    it("returns the merge request for the ticket id from the GitLab API ", async () => {
      jest
        .spyOn(GitLabAPI.prototype, "listProjectMergeRequests")
        .mockResolvedValue([createMergeRequest()]);
      const ticketId = "1";
      const mergeRequest = await mergeRequests.getMergeRequestForTicketId(
        ticketId
      );
      expect(GitLabAPI.prototype.listProjectMergeRequests).toHaveBeenCalled();
      expect(mergeRequest).toEqual({
        id: 1,
        iid: 1,
        title: "1-feature",
        url:
          "https://www.example.com/groupName/repositoryName/-/merge_requests/1",
      });
    });
  });
});
