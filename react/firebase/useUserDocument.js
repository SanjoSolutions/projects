import { useEffect, useState } from "react"
import { getDatabase } from "../../firebase/compat/getDatabase.js"
import { useUserId } from "./useUserId.js"

export function useUserDocument() {
  const userId = useUserId()
  const [userDocument, setUserDocument] = useState(null)

  useEffect(() => {
    setUserDocument(null)

    let unsubscribe

    if (userId) {
      async function retrieve() {
        const database = getDatabase()
        unsubscribe = database
          .collection("users")
          .doc(userId)
          .onSnapshot(setUserDocument)
      }

      retrieve()
    }

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [userId])

  return userDocument
}
