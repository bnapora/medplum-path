// Copyright 2020 Google LLC. All rights reserved.
// Use of this source code is governed by the Apache 2.0
// license that can be found in the LICENSE file.

// [START cloudrun_pubsub_server_setup]
// [START run_pubsub_server_setup]
const express = require('express');
const app = express();
const axios = require('axios');
// const webhookURL = 'https://53b300a2-3c9c-42c5-ab03-2fd06e261e2f:4e06f1b554a68faa4332a73fbece77abb01ab21b05e8aeffc25ad7bc2d043432@app.poc1.gestaltcloud.com/v1.0/fhir/R4/Bot/a2a5eb7d-6816-4724-8825-61424ee71ff2/$execute'
const webhookURL = 'https://c58d7a9e-3c52-438b-b7e2-037c1d231c4e:ee01c254989954f1c14709962788f3bc3a6ae548b02b09f7c0e510bed91ec8b7@app.poc1.gestaltcloud.com/v1.0/fhir/R4/Bot/878aad6d-2eb6-4074-9f31-1680b94b5618/$execute'

// This middleware is available in Express v4.16.0 onwards
app.use(express.json());

// [END run_pubsub_server_setup]
// [END cloudrun_pubsub_server_setup]

// [START cloudrun_pubsub_handler]
// [START run_pubsub_handler]
app.post('/', (req, res) => {
  if (!req.body) {
    const msg = 'no Pub/Sub message received';
    console.error(`error: ${msg}`);
    res.status(400).send(`Bad Request: ${msg}`);
    return;
  }
  if (!req.body.message) {
    const msg = 'invalid Pub/Sub message format';
    console.error(`error: ${msg}`);
    res.status(400).send(`Bad Request: ${msg}`);
    return;
  }

  const pubSubMessage = req.body.message;
  const name = pubSubMessage.data
    ? Buffer.from(pubSubMessage.data, 'base64').toString().trim()
    : 'World';

  // Format data for Medplum
  const data = {
      text: 'Pub/Sub Message',
      data: {
        label: 'Pub/Sub Message for Meplum',
        payload: Buffer.from(pubSubMessage.data, 'base64').toString().trim(),
        otherFields: {}
      } 
      };
  // Add post to Medplum
  axios.post(webhookURL, data)
  .then(response => {
    response.status(204).send();
    console.log(`Status: ${response.status}`);
    console.log('Body: ', response.data);
    console.log('Ran axios post method')
  })
  .catch(error => {
    console.error(`Error: ${error}`);
  });

  // Log end of Webhook Run
  console.log(`Hello ${name}!`);
  res.status(204).send();
});

// [END run_pubsub_handler]
// [END cloudrun_pubsub_handler]

module.exports = app;
