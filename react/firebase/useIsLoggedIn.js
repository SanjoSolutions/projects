import { useUser } from './useUser.js'

export function useIsLoggedIn() {
  const user = useUser()
  return Boolean(user)
}
