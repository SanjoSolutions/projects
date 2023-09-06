import { getFirestore } from "firebase-admin/firestore"
import type { Credentials } from "google-auth-library"

export async function readCredentials(): Promise<Credentials> {
  const db = getFirestore()
  const collection = db.collection("credentials")
  const documentReference = collection.doc("credentials")
  return (await documentReference.get()).data()!
}
