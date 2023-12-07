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
    -d "grant_type=client_credentials&client_id=ad5dea20-c844-4475-b198-d64d91d7f972&client_secret=
39482e47b6530342b8d81a0e2132e22f0c29af7fa10422d8a9aaab37e3356ba2"