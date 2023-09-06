import { request } from "@sanjo/request"
import type { RequestOptions } from "http"

export async function requestJSON(
  url: string,
  options: RequestOptions = {},
  data?: any,
): Promise<any> {
  const body = data ? JSON.stringify(data) : undefined
  if (!options.headers) {
    options.headers = {}
  }
  if (!options.headers["Content-Type"]) {
    options.headers["Content-Type"] = "application/json"
  }
  if (!options.headers["Accept"]) {
    options.headers["Accept"] = "application/json"
  }
  const response = await request(url, options, body)
  return JSON.parse(response.body)
}
