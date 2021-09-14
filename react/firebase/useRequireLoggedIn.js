import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useIsInitializing } from './useIsInitializing.js'
import { useUser } from './useUser.js'

export function useRequireLoggedIn() {
  const isInitializing = useIsInitializing()
  const user = useUser()
  const history = useHistory()

  useEffect(
    () => {
      if (!isInitializing && !user) {
        history.replace('/log-in', {
          redirectToAfterLogin: history.location.pathname
        })
      }
    },
    [
      isInitializing,
      user,
      history,
    ],
  )
}
