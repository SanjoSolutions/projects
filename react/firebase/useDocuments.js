import { useEffect, useState } from 'react'
import { identity } from '../../packages/identity/src/identity.js'

export function useDocuments(
  queryRef,
  filterFn = identity,
) {
  const [documents, setDocuments] = useState(null)

  useEffect(
    () => {
      async function retrieveDocuments() {
        const documentsResult = await queryRef.get()
        const documents = filterFn(documentsResult.docs)
        setDocuments(documents)
      }

      retrieveDocuments()
    },
    [
      queryRef,
      filterFn
    ],
  )

  return documents
}
