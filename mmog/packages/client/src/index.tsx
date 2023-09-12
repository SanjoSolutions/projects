import { Authenticator } from "@aws-amplify/ui-react"
import { Amplify } from "aws-amplify"
import React from "react"
import ReactDOM from "react-dom/client"
import { App } from "./App.jsx"
import { config } from "./config.js"

declare global {
  interface Window {
    IS_DEVELOPMENT: boolean
    SERVER_URL: string
  }
}

if (window.IS_DEVELOPMENT) {
  new EventSource("/esbuild").addEventListener("change", () =>
    location.reload(),
  )
}

const amplifyConfig = {
  ...(true || config.userPoolId != null
    ? {
        Auth: {
          region: config.awsRegion,
          userPoolId: config.userPoolId,
          userPoolWebClientId: config.userPoolClientId,
        },
      }
    : {}),
}
Amplify.configure(amplifyConfig)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Authenticator.Provider>
    <App />
  </Authenticator.Provider>,
)
