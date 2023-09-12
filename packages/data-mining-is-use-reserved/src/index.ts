import robotsParser from "robots-parser"
import fetch from "node-fetch"

export interface Options {
  userAgent?: string
}

export async function isUseReserved(url: string, options: Options): boolean {
  const robotsUrl = new URL("/robots.txt", url).toString()
  const robotsContent = await fetch(robotsUrl)
  const robots = robotsParser(robotsUrl, robotsContent)
  return robots.isAllowed(url, options.userAgent)
}
