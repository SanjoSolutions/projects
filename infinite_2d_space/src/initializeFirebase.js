import { initializeApp } from "firebase/app"

export function initializeFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyBpMvJ0coLk4bhNdm5jNiYUO1ZpXmi_4bY",
    authDomain: "infinite-2d-space.firebaseapp.com",
    projectId: "infinite-2d-space",
    storageBucket: "infinite-2d-space.appspot.com",
    messagingSenderId: "532791309142",
    appId: "1:532791309142:web:b70bea12bae00ad71fdcf7"
  }

  const app = initializeApp(firebaseConfig)

  return app
}
