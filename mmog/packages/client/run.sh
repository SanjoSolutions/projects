#!/bin/sh

export WEBSOCKET_API_URL="wss://w4kh7rmzbl.execute-api.eu-central-1.amazonaws.com/Prod"
export USER_POOL_ID="eu-central-1_dfRyEHuzZ"
export AWS_REGION="eu-central-1"
export USER_POOL_CLIENT_ID="5k3o2pps7jjbt0rbbjm08jk0ns"

node esbuild/development.js
