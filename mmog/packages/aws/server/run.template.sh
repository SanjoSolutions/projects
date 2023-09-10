#!/bin/sh

export AWS_REGION=eu-central-1
export AWS_ACCESS_KEY_ID=""
export AWS_SECRET_ACCESS_KEY=""
export API_GATEWAY_URL="wss://c6nhirjtx8.execute-api.eu-central-1.amazonaws.com/Prod"
export CONNECTIONS_TABLE_NAME="mmog-connections"
export OBJECTS_TABLE_NAME="mmog-objects"

node index.js
