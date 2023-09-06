import { createGmail } from "./createGmail.js"
import { emailAddress } from "./emailAddress.js"
import type { Header } from "./Header.js"
import { respondToMessage } from "./respondToMessage.js"
import { updateTokenIfUpdated } from "./updateTokenIfUpdates.js"

export async function processMessage(message: any) {
  const { auth, gmail } = await createGmail()

  const response = await gmail.users.messages.list({
    userId: emailAddress,
    labelIds: ["UNREAD", "INBOX"],
    q: "from:drive-shares-dm-noreply@google.com is:unread",
  })

  const messages = await Promise.all(
    (response.data.messages ?? []).map(async ({ id }) => {
      const response = await gmail.users.messages.get({
        userId: emailAddress,
        id: id!,
      })
      return response.data
    }),
  )

  const sharingRequestMessagesForDocument = messages.filter((message: any) =>
    message.payload.headers.some(
      (header: Header) =>
        header.name === "Subject" &&
        header.value === 'Share request for "DIN-5008 Template"',
    ),
  )

  await Promise.allSettled(
    sharingRequestMessagesForDocument.map(respondToMessage.bind(null, gmail)),
  )

  await updateTokenIfUpdated(auth)
}
