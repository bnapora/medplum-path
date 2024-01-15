### Notes for setting up Pub/Sub with Cloud Run Webhook to Medplum

#### Cloud Run with webhook tutorial:
- https://cloud.google.com/run/docs/tutorials/pubsub

- **Build Webhook Container**
`gcloud builds submit --tag gcr.io/gcp-services-experiments/pubsub`

- **Deploy/Update Webhook Container in Cloud Run**
`gcloud run deploy pubsub-tutorial --image gcr.io/gcp-services-experiments/pubsub  --no-allow-unauthenticated`

- **Send Pub/Sub test message**
`gcloud pubsub topics publish myRunTopic --message "Runner to Medplum Hook"`