import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

export async function logOut() {
  const auth = firebase.auth()
  await auth.signOut()
}
