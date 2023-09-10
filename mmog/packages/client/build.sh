#!/bin/sh

export WEBSOCKET_API_URL="wss://c6nhirjtx8.execute-api.eu-central-1.amazonaws.com/Prod"
export USER_POOL_ID="eu-central-1_ymEkR0Pl2"
export AWS_REGION="eu-central-1"
export USER_POOL_CLIENT_ID="8u1ik4t7irc110u4f51t3pnda"

node esbuild/build.js
