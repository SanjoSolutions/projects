import type { firestore } from "firebase-admin"
import { getFirestore } from "firebase-admin/firestore"
import type { gmail_v1 } from "@googleapis/gmail"
import { createEmail } from "./createEmail.js"
import { emailAddress } from "./emailAddress.js"
import type { Header } from "./Header.js"

export enum Status {
  Processing = "processing",
  Processed = "processed",
}

export async function respondToMessage(gmail: gmail_v1.Gmail, message: any) {
  const db = getFirestore()
  const collection = db.collection("emails")
  const documentReference = collection.doc(message.id)
  try {
    await db.runTransaction(async (transaction: firestore.Transaction) => {
      const document = (await transaction.get(documentReference)).data()
      const status = document?.status
      if (status !== Status.Processing && status !== Status.Processed) {
        transaction.set(documentReference, {
          status: Status.Processing,
        })
      } else {
        throw new Error(
          "The email is already processed or has already been processed.",
        )
      }
    })

    const to = message.payload.headers.find(
      (header: Header) => header.name === "Reply-To",
    ).value
    await gmail.users.messages.send({
      userId: emailAddress,
      requestBody: {
        raw: Buffer.from(createEmail({ to })).toString("base64"),
      },
    })
    await gmail.users.messages.modify({
      userId: emailAddress,
      id: message.id,
      requestBody: {
        removeLabelIds: ["UNREAD", "INBOX"],
      },
    })

    await documentReference.update({
      status: Status.Processed,
    })
  } catch (error) {
    // The email seems to be already processed or have already been processed.
  }
}
