import request from '@sanjo/request'
import type { RequestOptions } from 'http'

export async function requestJSON(url: string, options: RequestOptions = {}, data?: any): Promise<any> {
  const body = data ? JSON.stringify(data) : undefined
  const response = await request(url, options, body)
  return JSON.parse(response.body)
}
