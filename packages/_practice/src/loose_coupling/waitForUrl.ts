import request from '@sanjo/request'
import { waitFor } from './waitFor.js'

export async function waitForUrl(url: string): Promise<void> {
  const condition = async () => {
    try {
      await request(url)
      return true
    } catch (error) {
      return false
    }
  }
  await waitFor(condition)
}
