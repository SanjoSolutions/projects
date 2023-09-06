import { last } from "@sanjo/array"
import { initializeApp } from "firebase-admin/app"
import * as functions from "firebase-functions"
import "firebase-functions/lib/logger/compat"
import { processMessage } from "./processMessage.js"
import { topicName } from "./topicName.js"
import { watch as watchBase } from "./watch.js"

const region = "europe-west3"

initializeApp()

export const watch = functions
  .region(region)
  .pubsub.schedule("every 24 hours")
  .onRun(async function (context: any) {
    await watchBase()
  })

export const automaticallyAnswerShareRequests = functions
  .region(region)
  .pubsub.topic(last(topicName.split("/"))!)
  .onPublish(async function automaticallyAnswerShareRequests(message: any) {
    await processMessage(message)
  })
