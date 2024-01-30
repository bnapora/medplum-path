### Notes for setting up Pub/Sub with Cloud Run Webhook to Medplum

#### Cloud Run with gcp-pathology-poc1:
- https://cloud.google.com/run/docs/tutorials/pubsub

- **Build Webhook Container**
`gcloud builds submit --tag gcr.io/gcp-pathology-poc1/pubsub-webhook-medplum`

- **Deploy/Update Webhook Container in Cloud Run**
`gcloud run deploy pubsub-webhook-medplum --image gcr.io/gcp-pathology-poc1/pubsub-webhook-medplum --no-allow-unauthenticated`

- **Send Pub/Sub test message**
`gcloud pubsub topics publish pathflow-dicom-store-topic --message "Runner to Medplum Hook"`


### Sandbox
gcloud pubsub topics create sampleToic