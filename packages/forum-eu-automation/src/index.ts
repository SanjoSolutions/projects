// curl --header "PRIVATE-TOKEN: tE4B3aKudEnAxcuvjQxz" https://git.forum.engineering/api/v4/projects/5/repository/branches

import path from 'path'
import { MergeRequests } from './mergeRequests.js'

async function main () {
  const args = process.argv.slice(2)
  const command = args[0]

  const home = process.env.HOME || '~'
  const configPath = path.join(home, 'forum-eu-automation.config.json')
  const mergeRequests = new MergeRequests(configPath)
  await mergeRequests.initialize()

  switch (command) {
    case 'create-pr':
      await createMR(mergeRequests, args)
      break
    case 'mark-pr-as-ready':
      await markMRAsReady(mergeRequests, args)
      break
  }
}

async function createMR (mergeRequests: MergeRequests, args: string[]) {
  const status = args[1]
  if (!['wip', 'ready'].includes(status)) {
    throw new Error(`Invalid status: "${status}"`)
  }
  const ticketId = args[2]
  await mergeRequests.createMR(ticketId, status as 'wip' | 'ready')
}

async function markMRAsReady (mergeRequests: MergeRequests, args: string[]) {
  const ticketId = args[1]
  await mergeRequests.markMRAsReady(ticketId)
}

main().catch(console.error)
