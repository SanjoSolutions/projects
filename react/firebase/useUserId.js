import { useUser } from './useUser.js'

export function useUserId() {
  const user = useUser()
  return user ? user.uid : null
}
