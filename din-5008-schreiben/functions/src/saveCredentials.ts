import { getFirestore } from "firebase-admin/firestore"
import type { Credentials } from "google-auth-library"

export async function saveCredentials(credentials: Credentials): Promise<void> {
  const db = getFirestore()
  const collection = db.collection("credentials")
  const documentReference = collection.doc("credentials")
  await documentReference.set(credentials)
}
