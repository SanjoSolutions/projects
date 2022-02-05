import { exec } from '@sanjo/exec'
import { readJSON } from '@sanjo/read-json'
import puppeteer from 'puppeteer'
import { GitLabAPI } from './GitLabAPI.js'
import type { MergeRequest } from './MergeRequest.js'
import { SlackChannelPage } from './SlackChannelPage.js'
import { SlackLoginPage } from './SlackLoginPage.js'

export type Status = 'wip' | 'ready'

export interface Config {
  baseUrl: string
  gitLabToken: string
  projectId: string
  targetBranch: string
  slackAccount: SlackAccountCredentials
  slackReadyToReviewPostChannelUrl: string
  slackLoginUrl: string
}

export interface SlackAccountCredentials {
  email: string
  password: string
}

export class MergeRequests {
  #hasBeenInitialized: boolean = false
  #configPath: string
  #config: Config = {
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
  }

  constructor(configPath: string) {
    this.#configPath = configPath
  }

  async initialize(): Promise<void> {
    this.#config = await readJSON(this.#configPath)
    this.#hasBeenInitialized = true
  }

  async createMRWip(ticketId: string): Promise<void> {
    this.makeSureThatHasBeenInitialized()
    await this.createMR(ticketId, 'wip')
  }

  async createMRReady(ticketId: string): Promise<void> {
    this.makeSureThatHasBeenInitialized()
    await this.createMR(ticketId, 'ready')
  }

  async createMR(ticketId: string, status: Status): Promise<void> {
    this.makeSureThatHasBeenInitialized()
    await this.pushFeatureBranch(ticketId)
    await this.openMR(ticketId, status)
  }

  async pushFeatureBranch(ticketId: string): Promise<void> {
    this.makeSureThatHasBeenInitialized()
    const remoteRepository = 'origin'
    const branchNames = await this.getBranchNames()
    const localBranchName = this.findBranchNameForTicketId(branchNames, ticketId)
    if (!localBranchName) {
      throw new Error('Feature branch not found.')
    }
    const src = localBranchName
    const dst = localBranchName
    const refSpec = `${src}:${dst}`
    await exec(`git push '${remoteRepository}' '${refSpec}'`)
  }

  findBranchNameForTicketId(branchNames: string[], ticketId: string): string | null {
    return this.findBranchNameThatStartsWith(branchNames, `${ticketId}-`)
  }

  findBranchNameThatStartsWith(branchNames: string[], branchNameStart: string): string | null {
    this.makeSureThatHasBeenInitialized()
    const matchingBranchNames = branchNames.filter(branchName => branchName.startsWith(branchNameStart))
    if (matchingBranchNames.length > 1) {
      throw new Error(`Multiple branch names found that start with "${branchNameStart}".`)
    } else {
      return matchingBranchNames[0] || null
    }
  }

  async getBranchNames(): Promise<string[]> {
    this.makeSureThatHasBeenInitialized()
    const branches = await this.getBranches()
    const branchNames = branches.map(branch => branch.name)
    return branchNames
  }

  async getBranches(): Promise<{ name: string }[]> {
    this.makeSureThatHasBeenInitialized()
    const { stdout } = await exec('git branch --list')
    const branchNameRegExp = /^(?:\* )?\s*([^\s]+)$/
    const branches = stdout.split('\n').map(line => {
      const match = branchNameRegExp.exec(line)
      if (match) {
        return { name: match[1] }
      } else {
        throw new Error(`line "${line}" did not match the regular expression for a branch name.`)
      }
    })
    return branches
  }

  async openMR(ticketId: string, status: Status): Promise<void> {
    this.makeSureThatHasBeenInitialized()
    const gitLabAPI = this.createGitLabAPI()
    const branchNames = await gitLabAPI.listRepositoryBranches(this.#config.projectId)
    const branchName = this.findBranchNameThatStartsWith(branchNames, ticketId)
    if (branchName) {
      await gitLabAPI.createMergeRequest(this.#config.projectId, {
        sourceBranch: branchName,
        targetBranch: this.#config.targetBranch,
        title: this.generateMRTitle(branchName, status),
      })
    } else {
      throw new Error(`Branch name that starts with "${ticketId}" not found.`)
    }
  }

  generateMRTitle(branchName: string, status: Status): string {
    this.makeSureThatHasBeenInitialized()
    switch (status) {
      case 'wip':
        return `WIP: ${branchName}`
      case 'ready':
        return branchName
    }
  }

  async markMRAsReady(ticketId: string): Promise<void> {
    this.makeSureThatHasBeenInitialized()
    const mergeRequest = await this.getMergeRequestForTicketId(ticketId)
    if (mergeRequest) {
      await this.removeWipFromTitle(ticketId) // Pass merge request?
      await this.postReadyToReviewMessage(ticketId, mergeRequest)
    } else {
      throw createMergeRequestForTicketNotFoundError(ticketId)
    }
  }

  async getMergeRequestForTicketId(ticketId: string): Promise<MergeRequest | null> {
    this.makeSureThatHasBeenInitialized()
    const gitLabAPI = this.createGitLabAPI()
    const mergeRequests = await gitLabAPI.listProjectMergeRequests(this.#config.projectId)
    const mergeRequest = this.findMergeRequestForTicketId(mergeRequests, ticketId)
    return mergeRequest
  }

  findMergeRequestForTicketId(mergeRequests: MergeRequest[], ticketId: string): MergeRequest | null {
    return findStartsWith(mergeRequests, 'title', `${ticketId}-`)
  }

  createGitLabAPI() {
    return new GitLabAPI(this.#config.baseUrl, this.#config.gitLabToken)
  }

  async removeWipFromTitle(ticketId: string): Promise<void> {
    this.makeSureThatHasBeenInitialized()
    // update mr
  }

  async postReadyToReviewMessage(ticketId: string, mergeRequest: MergeRequest): Promise<void> {
    this.makeSureThatHasBeenInitialized()
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(this.#config.slackLoginUrl)
    const slackLoginPage = new SlackLoginPage(page)
    await slackLoginPage.login(this.#config.slackAccount.email, this.#config.slackAccount.password)
    await page.goto(this.#config.slackReadyToReviewPostChannelUrl)
    const slackChannelPage = new SlackChannelPage(page)
    await slackChannelPage.postMessage(
      `Merge request “[${mergeRequest.title}](${mergeRequest.url})” ready to be reviewed.`
    )
  }

  private makeSureThatHasBeenInitialized(): void {
    if (!this.#hasBeenInitialized) {
      throw new Error(
        'MergeRequests needs to be initialized ' +
          'by calling the initialize method ' +
          'before other methods can be used.'
      )
    }
  }
}

export function createMergeRequestForTicketNotFoundError(ticketId: string): Error {
  return new Error(`Merge request for ticket id "${ticketId}" not found.`)
}

function findStartsWith(array: any[], propertyName: string, startsWithString: string): any | null {
  return array.find(propertyStartsWith.bind(null, propertyName, startsWithString))
}

function propertyStartsWith(propertyName: string, startsWithString: string, object: any): boolean {
  return object[propertyName].startsWith(startsWithString)
}
