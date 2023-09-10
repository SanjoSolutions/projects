import { Authenticator } from "@aws-amplify/ui-react"
import "@aws-amplify/ui-react/styles.css"
import React from "react"

export function App() {
  return (
    <Authenticator loginMechanisms={["email"]} signUpAttributes={[]}>
      {({ signOut, user }) => {
        window.user = user
        return (
          <div className="links">
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault()
                signOut()
              }}
            >
              Log out
            </a>
            <a className="credits" href="credits.html" target="_blank">
              Credits
            </a>
          </div>
        )
      }}
    </Authenticator>
  )
}
