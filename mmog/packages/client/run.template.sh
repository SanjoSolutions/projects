#!/bin/sh

export WEBSOCKET_API_URL=""
export USER_POOL_ID=""
export AWS_REGION="eu-central-1"
export USER_POOL_CLIENT_ID=""

node esbuild/development.js
