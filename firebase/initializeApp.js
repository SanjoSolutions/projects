import firebase from 'firebase/compat/app'
import once from 'lodash.once'

export const initializeApp = once(function initializeApp(config) {
  firebase.initializeApp(config)
})
