export const additionalDefines = {
  "window.SERVER_URL":
    '"wss://lgz6c34zc5.execute-api.eu-central-1.amazonaws.com/Prod/"',
  "window.WEBSOCKET_API_URL": `"${process.env.WEBSOCKET_API_URL}"`,
  "window.USER_POOL_ID": `"${process.env.USER_POOL_ID}"`,
  "window.AWS_REGION": `"${process.env.AWS_REGION}"`,
  "window.USER_POOL_CLIENT_ID": `"${process.env.USER_POOL_CLIENT_ID}"`,
}
