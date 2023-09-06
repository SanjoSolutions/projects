import { createGmail } from "./createGmail.js"
import { topicName } from "./topicName.js"
import { updateTokenIfUpdated } from "./updateTokenIfUpdates.js"

export async function watch() {
  const { auth, gmail } = await createGmail()
  await gmail.users.watch({
    userId: "me",
    requestBody: {
      topicName,
    },
  })
  await updateTokenIfUpdated(auth)
}
