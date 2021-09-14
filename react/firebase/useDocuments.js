import { useEffect, useState } from 'react'
import { identity } from '../../packages/identity/src/identity.js'

export function useDocuments(
  queryRef,
  filterFn = identity,
) {
  const [documents, setDocuments] = useState(null)

  useEffect(
    () => {
      async function retrieve() {
        setDocuments(null)
        const documents = await retrieveDocuments(queryRef, filterFn)
        setDocuments(documents)
      }

      retrieve()
    },
    [
      queryRef,
      filterFn
    ],
  )

  return documents
}

export async function retrieveDocuments(queryRef, filterFn = identity) {
  const documentsResult = await queryRef.get()
  const documents = filterFn(documentsResult.docs)
  return documents
}
