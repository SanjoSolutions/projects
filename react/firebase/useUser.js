import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { useState, useEffect } from "react"

export function useUser() {
  const auth = firebase.auth()
  const [user, setUser] = useState(auth.currentUser)

  useEffect(() => {
    const auth = firebase.auth()
    const unsubscribe = auth.onAuthStateChanged(setUser)
    return unsubscribe
  }, [])

  return user
}
