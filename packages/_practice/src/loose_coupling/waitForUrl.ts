import request from '@sanjo/request'
import { waitFor } from './waitFor'

export async function waitForUrl (url) {
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
