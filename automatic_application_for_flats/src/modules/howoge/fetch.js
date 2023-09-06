import { createFetch } from "../../lib/createFetch.js"
import { fetchOnce } from "./fetchOnce.js"

export const fetch = createFetch({
  fetchOnce,
})
