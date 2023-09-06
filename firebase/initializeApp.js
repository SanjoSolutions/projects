import { initializeApp as initializeAppBase } from "firebase/app"
import once from "lodash.once"

export const initializeApp = once(function initializeApp(config) {
  return initializeAppBase(config)
})
