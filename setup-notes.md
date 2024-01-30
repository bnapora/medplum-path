
### .env File Backup
MEDPLUM_BASE_URL=http://localhost:8103/
MEDPLUM_CLIENT_ID=
GOOGLE_CLIENT_ID=705265833508-emhk0k9fuuakpaarj0rp81uql03pqlvn.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
// Recaptcha v2
RECAPTCHA_SITE_KEY=6LfVGTYnAAAAAD4lCtgx8VqJGYc1kH7qih2OGf93
RECAPTCHA_SECRET_KEY=6LfVGTYnAAAAAJgxIth26cy3txOylZirlQsOIPIh
MEDPLUM_REGISTER_ENABLED=true

v3 reCAPTCHA
SITE_KEY=6LdBKjYnAAAAAKOE_QaBQRb7_6yd8Tv-PKRoe8WX
SECRET_KEY=6LdBKjYnAAAAAOZ-oVXibuyVcwSM0kLXTlI-QIf6

### Config & Install React Components
- need to build React components (using `npm run build` in packages/React)  
- Install local React components in package.json
`npm install --save ../../packages/react  `
- Install additional MedPlum Client Dependencies
`npm install --save @medplum/core @medplum/definitions @medplum/fhirtypes @medplum/mock`


### Setup External Services
AWS Simple Email Service (SES)
https://us-west-2.console.aws.amazon.com/ses/home?region=us-west-2#/verified-identities/bnapora%40insynthion.com?tabId=authentication
- Use configured email address in medplum.config.json setup file

Google Auth
Instructions: https://refine.dev/blog/nextauth-google-github-authentication-nextjs/#for-googleprovider-make-sure-you-have-a-google-account


Recaptcha
https://www.google.com/recaptcha/admin/site/657861185

#### Invite User
`{"resourceType": "Practitioner","firstName": "Brian","lastName": "Napopra","email": "bnapora@insynthion.com",
"membership": {"admin": true}}`

curl 'http://localhost:3000/admin/projects/b13cbbb5-ac04-4247-8759-96153c64f53b/invite' \
  -H 'Authorization: Bearer ${accessToken}' \
  -H 'Content-Type: application/json' \
  --data-raw `{"resourceType": "Practitioner","firstName": "Brian","lastName": "Napopra","email": "bnapora@insynthion.com","membership": {"admin": true}}`

- Errored with "resourceType"
- CAn't invite user because can't send email SES
FIXED - modified email routine (and config) to use different SES credentials

#### Synthetic FHIR Data
https://synthea.mitre.org/downloads

### FHIR Data Resources
FHIR Github - tools for FSH: https://github.com/FHIR
VSCode Extenstion to create FSH and convert to FHIR with SUSHI: https://github.com/standardhealth/vscode-language-fsh
FSHSchool - online FSH -> FHIR converter: https://fshschool.org/
- also has a FHIR/FSH tutorial: https://fshschool.org/courses/fsh-seminar/
PlantUML - used for diagraming

#### DiagnosticReport Pathology Specs & Samples
https://developer.nhs.uk/apis/itk3nationalpathology-1-1-0/
https://hl7.org/fhir/us/cancer-reporting/STU1/DiagnosticReport-pathology-diagnostic-report.json.html

Items to Research (07/19/23)
[] Running Bots locally
[] Create Task linked to Diagnostic Report and Image


## Code Discovery
Table/Lists - component is "SearchControl" in React repo

Resource Edit Page - used to change values of a resource `EditPage.tsx`; Uses `ResourceForm.tsx` to render all field controls

## Whole Slide Image FHIR Resource Structure (073123)
ServiceRequest --> DiagnosticReport --> Observation --> (if DICOM) --> ImagingStudy (else) --> Media
- see FHIR link: https://www.hl7.org/fhir/R4/diagnostics-module.html


## Merge steps to keep code in sync with upstream (120623)
- https://timwise.co.uk/2019/10/14/merge-vs-rebase/
1. Merge upstream medplum repo into `main` branch of medplum-path repo
1. In `develop` branch run `git fetch`
1. Run `git merge origin/main`
1. Run `git push`

## Setup Steps from new repo (120723)
- created new docker-compose file to include DB volume
- copy in current packages/server/medplum.config.json
- modify 'pacakage.json' in custom apps to point to medplum modules in `packages` dir (file:../../packages/react)

### Customizations
1. packages/server/src/auth/me.ts - provides menu items for left side nav
1. packages/react/src/Logo - changes to Gestalt SVG image

### CLI Useage

medplum login \
    --auth-type "basic" \
    --base-url "http://localhost:8103" \
    --fhir-url-path "/fhir/R4" \
    --client-id "dea997cc-8954-4787-a193-d2450f86009e" \
    --client-secret "cfdacdb6e518f9f439463d24baf2fde5234407ddbd70573a254cc4e76c3b49a2"

- tested retrieving a patient and seemed to work after running `medplum login` command above
medplum get --base-url http://localhost:8103 'Patient/628f2bbb-865b-4ef6-935d-7d6ac3ea3493'

### Configure compose file with all services and applications (011124)
1. Create compose application `docker-compose.path.yml`

* Configure GCP VM 
1. Install docker

IMPORTANT NOTE - Medplum Applications (Admin, etc) can't authenticate to Medplum Server when app is using an IP address, needs Fully Qualified Domain Name with SSL (eg. apps.poc1.gestaltcloud.com)  
- when deploying to cloud host, need to make sure have DNS

IMPORTANT NOTE - was unable to reuse Medplum DB in a Volume, when DB image that created db was deleted.  Had to create new DB using Medplum create script. (012824)

### Setup Google Auth
- use https://www.medplum.com/docs/auth/methods/google-auth
- need to make sure both 
- need to add googleClientId and googleClientSecret to Medplum Project "Site" before auth will work
- in Google Auth credentials config, need to make sure Javascript origins and authorized redirect URI's are populated with correct domain