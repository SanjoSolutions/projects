import { readJSON } from "@sanjo/read-json";
import admin from "firebase-admin";
import { authenticate } from "./authenticate.js";
import { saveCredentials } from "./saveCredentials.js";

async function main() {
  const auth = await authenticate();
  const credentials = auth.credentials;

  const serviceAccount = await readJSON("din-5008-schreiben-5b8d87b0b839.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://din-5008-schreiben.firebaseio.com",
  });
  await saveCredentials(credentials);
}

main().catch(console.error);
