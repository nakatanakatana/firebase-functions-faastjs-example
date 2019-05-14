import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});


import { faastGoogle } from "faastjs";
import * as funcs from "./faastTask/hello";

const faastRunnerOptions = {
  timeoutSeconds: 540,
}

export const runFaast = functions.runWith(faastRunnerOptions).https.onRequest(async (request, response) => {
  console.log('faast');
  const m = await faastGoogle(funcs, {
    memorySize: 128,
    timeout: 540,
    region: "us-central1"
  });
  console.log(`## Logs`);
  console.log(`${m.logUrl()}`);
  try {
    const result = await m.functions.hello("GCP");
    console.log(`## Output`);
    console.log(result);
    console.log(`## Cost`);
    const cost = await m.costSnapshot();
    console.log(`${cost}`);
    console.log(`## Stats`);
    console.log(`${m.stats()}`);
  } finally {
    await m.cleanup();
}
 response.send("faastjs run from Firebase!");
});
