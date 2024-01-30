## Bots Development

### Running Lambda functions locally

1. Configure "bot-layer" (packages/bot-layer) --> output=medplum-bot-layer
1. Build specific bot


docker run --rm [-d] \
  -e DOCKER_LAMBDA_STAY_OPEN=1 \
  -p 9001:9001 \
  -v <code_dir>:/var/task:ro,delegated \
  [-v <layer_dir>:/opt:ro,delegated] \
  lambci/lambda:<runtime> \
  [<handler>]

  # Test with layers (assumes your function code is in `./fn` and your layers in `./layer`)
docker run --rm -v "$PWD"/fn:/var/task:ro,delegated -v "$PWD"/layer:/opt:ro,delegated lambci/lambda:nodejs18.x

- Run inside `bots` directory
docker run --rm \
  -e DOCKER_LAMBDA_STAY_OPEN=1 \
  -p 9001:9001 \
  -v ./functions/hello-patient:/var/task:ro,delegated \
  -v ./layers:/opt:ro,delegated \
  lambci/lambda:nodejs12.x


curl -XPOST "http://localhost:9001/2015-03-31/functions/function/invocations" -d '{}'

## Running lambda layer against localstack
- https://docs.localstack.cloud/user-guide/aws/lambda/#creating-and-invoking-a-lambda-layer-locally  

- Command to install medplum-bot-layer in localstack
aws lambda publish-layer-version \
  --endpoint-url=http://localhost:4566 \
  --region us-west-2 \
  --layer-name "medplum-bot-layer" \
  --description "Medplum Bot Layer" \
  --license-info "Apache-2.0" \
  --compatible-runtimes "nodejs18.x" \
  --zip-file fileb://./layers/medplum-bot-layer.zip

- Enable bots in medplum:
  - set to true

#### Sample lambda deployment
https://docs.localstack.cloud/user-guide/aws/lambda/#creating-and-invoking-a-lambda-layer-locally

zip function.zip index.js

aws lambda create-function \
    --endpoint-url=http://localhost:4566 \
    --function-name hello-patient2 \
    --runtime nodejs18.x \
    --zip-file fileb://function.zip \
    --handler index.handler \
    --role arn:aws:iam::000000000000:role/lambda-role

- invoke function
aws lambda invoke --function-name localstack-lambda-url-example \
    --endpoint-url=http://localhost:4566 \
    --cli-binary-format raw-in-base64-out \
    --payload '{"body": "{\"num1\": \"10\", \"num2\": \"10\"}" }' output.txt

- create a function URL
aws lambda create-function-url-config \
    --endpoint-url=http://localhost:4566/ \
    --function-name hello-patient2 \
    --auth-type NONE

http://sha5vpqlwcmwazhybfan3zbxzs8bc4x7.lambda-url.us-west-2.localhost.localstack.cloud:4566

- invoke function URL
http://localstack-lambda-url-example.lambda-url.us-east-1.localhost.localstack.cloud:4566

curl -X POST 'http://ctu3jmmtkaqe1ft4ultlxa3xjovbqn83.lambda-url.us-west-2.localhost.localstack.cloud:4566/' \
    -H 'Content-Type: application/json' \
    -d '{"num1": "10", "num2": "10"}'

curl -X POST 'http://localhost:3000/Bot/39580929-4057-468d-9c72-6beb4f49e9a0/$execute/' \
    -H 'Content-Type: application/json' \
    -d '{"num1": "10", "num2": "10"}'

    http://localhost:3000/Bot/39580929-4057-468d-9c72-6beb4f49e9a0/$execute

- Get Medplum Client Auth
curl -X POST http://localhost:3000/oauth/token \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d "grant_type=client_credentials&client_id=a11caacf-efa5-4b4c-b9d5-15f0772ef460"

## Bot Setup Experiments (122123)
- adding config setting to `medplum.config.json` for: `"vmContextBotsEnabled": true,`
- create bot using UI,  change "Runtime Version" to `vmcontext`
- can then "Deploy" and "Execute" bot

#### Connecting to Medplum Service
- create access_token
export MY_CLIENT_ID=dea997cc-8954-4787-a193-d2450f86009e        # Bot Client
export MY_CLIENT_SECRET=cfdacdb6e518f9f439463d24baf2fde5234407ddbd70573a254cc4e76c3b49a2
curl -X POST http://localhost:8103/oauth2/token \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d "grant_type=client_credentials&client_id=$MY_CLIENT_ID&client_secret=$MY_CLIENT_SECRET"
- use `access_token` value from response to create additional env var:
export ACCESS_TOKEN=eyJhbGciOiJSUzI1NiIsImtpZCI6IjY4MTU1ZjU2LTg5MGYtNDFlYi04NmQyLWFjZmRmYWNjMDU3NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOiJkZWE5OTdjYy04OTU0LTQ3ODctYTE5My1kMjQ1MGY4NjAwOWUiLCJsb2dpbl9pZCI6IjAxNjFkMjg1LTVkNTMtNGU4Zi1iMzJkLWQ1ODYzOTY3ZjA3MyIsInN1YiI6ImRlYTk5N2NjLTg5NTQtNDc4Ny1hMTkzLWQyNDUwZjg2MDA5ZSIsInVzZXJuYW1lIjoiZGVhOTk3Y2MtODk1NC00Nzg3LWExOTMtZDI0NTBmODYwMDllIiwic2NvcGUiOiJvcGVuaWQiLCJwcm9maWxlIjoiQ2xpZW50QXBwbGljYXRpb24vZGVhOTk3Y2MtODk1NC00Nzg3LWExOTMtZDI0NTBmODYwMDllIiwiaWF0IjoxNzAzMjY2OTg2LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgxMDMvIiwiYXVkIjoiZGVhOTk3Y2MtODk1NC00Nzg3LWExOTMtZDI0NTBmODYwMDllIiwiZXhwIjoxNzAzMjcwNTg2fQ.P0kLLlwMhdiuqfv3r_HubSeBOu66F7FWJC5y1GlxskINMeIXk9J3w8mQIfkew_nnBViyQnUgHpYoWYDSvLQRS-FoKFjSKx_6bK5XiysoPQ_cptp_4jQL6XGMwY20bk3KC7Gxw9nxaPxDywAHKKr-6eb3ptJVyn4sGztg9c7dX6pTuvffiv1CaSzzcm9jd5ftdwp7q2s-LbjDATGayaa3cbgF0RAE9cc0KsL6y30qnSROAy2qc7pxn4ubOj_pzNVhCz9BPYLoLGWw0BrZHRzaS9HPPHrHkCZacNsMIMmEJrm9f4hB50eRp1RpQWFIvEZ3l2lejEU6BpHkOuz6F2fzKg

#### Testing HL7 ADT Bot
curl -X POST 'http://localhost:8103/fhir/R4/Bot/d8c4e881-23a8-4e79-b03b-6145a95b3f2e/$execute' \
--header 'Content-Type: x-application/hl7-v2+er7' \
--header 'Authorization: Bearer '$ACCESS_TOKEN \
--data-raw 'MSH|^~\&|Primary||CL|PDMT|20200312081842|168866|ADT^A28|203598|T|2.3|||||||||||
EVN|A28|20200312081842||REG_UPDATE|MAKEPEACE^GLOVER^JASMIN^^^^^^PHC^^^^^10010||
PID|1||E3866011^^^EPIC^MRN~900093259^^^EPI^MR||TESTING^UGA||20000312|M|||^^^^^USA^P||||||||123-54-8888|||||N||||||N||
PD1|||PHYSICIANS ATLANTIC STATION^^10010|||||||||||||||
PV1|1|N||||||||||||||||||||||||||||||||||||||||||||||||||||
PV2||||||||||||||||||||||N|||||||||||||||||||||||||||'

#### Deploying Bot using CLI
- https://www.medplum.com/docs/bots/bots-in-production

1. Create Bot
 - npx medplum bot create <bot-name> <project-id> <source-file>
Example: `medplum bot create --runtime-version vmcontext sample-account-setup  a11caacf-efa5-4b4c-b9d5-15f0772ef460 src/sample-account-setup.ts dist/sample-account-setup.js`

Example: `medplum bot create hello-patient  a11caacf-efa5-4b4c-b9d5-15f0772ef460 src/hello-patient.ts dist/hello-patient.js`

1. Deploy Bot
- npx medplum bot deploy <bot-name>
Note: command runs with errors, however code seems to be deployed.
Example: `medplum bot deploy sample-account-setup`

Example: `medplum bot deploy hello-patient`

1. Deploy Bot in Admin page

### Deploying Agent with Bots (122223)
- https://www.medplum.com/docs/agent#testing-on-localhost  

Endpoint/4d1482ee-eeeb-4d83-8795-32058d5c9737
Bot/866bb3e8-0cd2-40be-a930-97f41b363255

Agent/3482123d-bd6d-47da-9ef7-60b926c5468c

export BASE_URL=http://localhost:8103
export MY_CLIENT_ID=dea997cc-8954-4787-a193-d2450f86009e        
export MY_CLIENT_SECRET=cfdacdb6e518f9f439463d24baf2fde5234407ddbd70573a254cc4e76c3b49a2

- Run from code repo:
npm run agent <base_url> <client_id> <client_secret> <agent_id>
npm run agent $BASE_URL $MY_CLIENT_ID $MY_CLIENT_SECRET 3482123d-bd6d-47da-9ef7-60b926c5468c

- Test Agent using SimHospital
docker run --rm -it -p 8000:8000 --name sim-hospital eu.gcr.io/simhospital-images/simhospital:latest health/simulator -output mllp -mllp_destination host.docker.internal:56000 -pathways_per_hour 720

### Transaction Flow
SimHospital --> Agent (HL7) --> Endpoint --> Bot (HL7)
1. Start Agent
1. Start SimHospital
1. Review transactions in Bot

### Test Pub/Sub Bots with GCP
export BASE_URL=https://app.poc1.gestaltcloud.com/v1.0
export MY_CLIENT_ID=53b300a2-3c9c-42c5-ab03-2fd06e261e2f       
export MY_CLIENT_SECRET=4e06f1b554a68faa4332a73fbece77abb01ab21b05e8aeffc25ad7bc2d043432
export BOT_ID=a2a5eb7d-6816-4724-8825-61424ee71ff2

https://53b300a2-3c9c-42c5-ab03-2fd06e261e2f:4e06f1b554a68faa4332a73fbece77abb01ab21b05e8aeffc25ad7bc2d043432@app.poc1.gestaltcloud.com/v1.0/fhir/R4/Bot/a2a5eb7d-6816-4724-8825-61424ee71ff2/$execute

https://app.poc1.gestaltcloud.com/v1.0/fhir/R4/Bot/a2a5eb7d-6816-4724-8825-61424ee71ff2/$execute
