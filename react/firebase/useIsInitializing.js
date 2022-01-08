import { useEffect, useState } from 'react'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { initializeApp } from '../../../firebase/initializeApp.js'

initializeApp()

const auth = firebase.auth()

let isInitializing = true

let unsubscribe
unsubscribe = auth.onAuthStateChanged(function () {
  isInitializing = false
  unsubscribe()
})

export function useIsInitializing() {
  const [isInitializing2, setIsInitializing2] = useState(isInitializing)

  useEffect(() => {
    if (isInitializing) {
      let unsubscribe
      unsubscribe = auth.onAuthStateChanged(function () {
        setIsInitializing2(false)
        unsubscribe()
      })
    }
  }, [])

  return isInitializing2
}
