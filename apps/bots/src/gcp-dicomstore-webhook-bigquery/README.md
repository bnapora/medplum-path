### Setup for GCP Client Libraries ADC Authetnication
- https://cloud.google.com/docs/authentication/provide-credentials-adc#on-prem
- Using service account key and make it available to ADC

export GOOGLE_APPLICATION_CREDENTIALS="/home/bnapora/development/medplum/medplum-path/bots/functions/gcp-dicomstore-webhook-bigquery/svc_account_key/key_medplum-bot-poc1-pathology_gcp-pathology-poc1-0097c5eb541b.json"

### Install Notes - Webhook Bot for GCP
**Important** - when using `vmcontext` Bot, external modules need to be installed with npm into Medplum server.
TODO - add bot dependencies to package.json

**IMPORTANT** - `svs_account_key` is not included in git repo.  Need to manually copy (01/23/24)