import { useEffect, useState } from 'react'
import { identity } from '../../packages/identity/src/identity.js'

export function useDocumentSnapshots(queryRef, filterFn = identity) {
  const [documents, setDocuments] = useState(null)

  useEffect(() => {
    setDocuments(null)
    let unsubscribe

    async function retrieve() {
      unsubscribe = queryRef.onSnapshot(snapshot => {
        setDocuments(filterFn(snapshot.docs))
      })
    }

    retrieve()

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [queryRef, filterFn])

  return documents
}
