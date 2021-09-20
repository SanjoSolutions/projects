import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { isDevelopment } from '../isDevelopment.js'
import { hasDatabaseAlreadyBeenStarted } from './hasDatabaseAlreadyBeenStarted.js'

export const getDatabase = function getDatabase() {
  const database = getFirestore()
  if (isDevelopment() && !hasDatabaseAlreadyBeenStarted(database)) {
    connectFirestoreEmulator(database, 'localhost', 8080)
  }
  return database
}
