import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import { isDevelopment } from '../isDevelopment.js'
import { hasDatabaseAlreadyBeenStarted } from './hasDatabaseAlreadyBeenStarted.js'

export const getDatabase = function getDatabase() {
  const database = firebase.firestore()
  if (isDevelopment() && !hasDatabaseAlreadyBeenStarted(database)) {
    database.useEmulator('localhost', 8080)
  }
  return database
}
