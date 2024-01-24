import { BotEvent, MedplumClient } from '@medplum/core';
import { ImagingStudy } from '@medplum/fhirtypes';
import { BigQuery } from '@google-cloud/bigquery';

const keyFilePath = '/home/bnapora/development/medplum/medplum-path/apps/bots/src/gcp-dicomstore-webhook-bigquery/svc_account_key/key_medplum-bot-poc1-pathology_gcp-pathology-poc1-0097c5eb541b.json';
// const keyFilePath = '/app/bots/key_medplum-bot-poc1-pathology_gcp-pathology-poc1-0097c5eb541b.json';
const options = {
    keyFilename: keyFilePath,
    projectId: 'gcp-pathology-poc1',
  };

const bigquery = new BigQuery(options);

const convertDelimitedStrToObject = string => 
    string.replace('dicomWeb/', '')
    .split('/')
    .reduce((accumulator, current, index, array) => {
        return index % 2 === 0
            ? Object.assign({ [current]: array[index + 1] }, accumulator)
            : accumulator
    }, {});

export async function handler(medplum: MedplumClient, event: BotEvent): Promise<any> {
  // const input = event.input;
  // const pubsubmsg=String(input['data']['payload']);
// async function query() {
  //Sample DCM: 5 Series Multi-Image 
  // const input = 'projects/gcp-pathology-poc1/locations/us-west2/datasets/dicom-pathology/dicomStores/slide-dicom-store/dicomWeb/studies/1.2.826.0.1.3680043.8.498.82621352484651007327778332284894343429/series/1.2.826.0.1.3680043.8.498.10554939809237388012375224861525298441/instances/1.2.826.0.1.3680043.8.498.75645955057998447880898671763092855767';
  // const input = 'projects/gcp-pathology-poc1/locations/us-west2/datasets/dicom-pathology/dicomStores/slide-dicom-store/dicomWeb/studies/1.2.826.0.1.3680043.8.498.82621352484651007327778332284894343429/series/1.2.826.0.1.3680043.8.498.10554939809237388012375224861525298441/instances/1.2.826.0.1.3680043.8.498.72603895181685033856738031817401027997';
  // const input = 'projects/gcp-pathology-poc1/locations/us-west2/datasets/dicom-pathology/dicomStores/slide-dicom-store/dicomWeb/studies/1.2.826.0.1.3680043.8.498.82621352484651007327778332284894343429/series/1.2.826.0.1.3680043.8.498.10554939809237388012375224861525298441/instances/1.2.826.0.1.3680043.8.498.49844264710078562317141996282957073131';
  const input = 'projects/gcp-pathology-poc1/locations/us-west2/datasets/dicom-pathology/dicomStores/slide-dicom-store/dicomWeb/studies/1.2.826.0.1.3680043.8.498.82621352484651007327778332284894343429/series/1.2.826.0.1.3680043.8.498.20753633745529569179908068644091507541/instances/1.2.826.0.1.3680043.8.498.73777438350201928712934893491207911548';
  // const input = 'projects/gcp-pathology-poc1/locations/us-west2/datasets/dicom-pathology/dicomStores/slide-dicom-store/dicomWeb/studies/1.2.826.0.1.3680043.8.498.82621352484651007327778332284894343429/series/1.2.826.0.1.3680043.8.498.20753633745529569179908068644091507541/instances/1.2.826.0.1.3680043.8.498.67268449332737763118398728475596725882';

  //Sample DCM: 7 Instances (Jimmy Stewart)
  // const input = 'projects/gcp-pathology-poc1/locations/us-west2/datasets/dicom-pathology/dicomStores/slide-dicom-store/dicomWeb/studies/1.2.276.0.7230010.3.1.2.875770937.1.1701420428.448952/series/1.2.276.0.7230010.3.1.3.875770937.1.1701420428.448953/instances/1.2.276.0.7230010.3.1.4.875770937.1.1701420428.448959';
  // const input = 'projects/gcp-pathology-poc1/locations/us-west2/datasets/dicom-pathology/dicomStores/slide-dicom-store/dicomWeb/studies/1.2.276.0.7230010.3.1.2.875770937.1.1701420428.448952/series/1.2.276.0.7230010.3.1.3.875770937.1.1701420428.448953/instances/1.2.276.0.7230010.3.1.4.875770937.1.1701420428.448957';
  // const input = 'projects/gcp-pathology-poc1/locations/us-west2/datasets/dicom-pathology/dicomStores/slide-dicom-store/dicomWeb/studies/1.2.276.0.7230010.3.1.2.875770937.1.1701420428.448952/series/1.2.276.0.7230010.3.1.3.875770937.1.1701420428.448953/instances/1.2.276.0.7230010.3.1.4.875770937.1.1701420428.448954';
  // const input = 'projects/gcp-pathology-poc1/locations/us-west2/datasets/dicom-pathology/dicomStores/slide-dicom-store/dicomWeb/studies/1.2.276.0.7230010.3.1.2.875770937.1.1701420428.448952/series/1.2.276.0.7230010.3.1.3.875770937.1.1701420428.448953/instances/1.2.276.0.7230010.3.1.4.875770937.1.1701420428.448955';
  // const input = 'projects/gcp-pathology-poc1/locations/us-west2/datasets/dicom-pathology/dicomStores/slide-dicom-store/dicomWeb/studies/1.2.276.0.7230010.3.1.2.875770937.1.1701420428.448952/series/1.2.276.0.7230010.3.1.3.875770937.1.1701420428.448953/instances/1.2.276.0.7230010.3.1.4.875770937.1.1701420428.448960';
  
  //Sample DCM: green-square
  // const input = 'projects/gcp-pathology-poc1/locations/us-west2/datasets/dicom-pathology/dicomStores/slide-dicom-store/dicomWeb/studies/1.2.826.0.1.3680043.8.498.13230779778012324449356534479549187420/series/1.2.826.0.1.3680043.8.498.45787841905473114233124723359129632652/instances/1.2.276.0.7230010.3.1.4.1647338594.1.1705691905.664899';
  const pubsubmsg = input;
  
  // console.log('pubsubmsg=', pubsubmsg);
  
  const pubsubmsgJSON = convertDelimitedStrToObject(pubsubmsg);

  const query = 
  //TODO: move filter/groupby logic to BigQuery View
          `SELECT * 
          FROM (SELECT MAX (LastUpdated) max_dt FROM \`gcp-pathology-poc1.dicom_pathology.webhook_slide-dicom-store-metadataView\` 
                GROUP BY StudyInstanceUID, SeriesInstanceUID, SOPInstanceUID),
            \`gcp-pathology-poc1.dicom_pathology.webhook_slide-dicom-store-metadataView\` 
          WHERE LastUpdated=max_dt
            AND StudyInstanceUID='${pubsubmsgJSON['studies']}' 
            AND SeriesInstanceUID = '${pubsubmsgJSON['series']}'
            AND SOPInstanceUID = '${pubsubmsgJSON['instances']}'`
  console.log('query=', query);
  const options = {
    query: query,
    // Location must match that of the dataset(s) referenced in the query.
    location: 'us-west2',
  };

  // Run the query as a job
  const [job] = await bigquery.createQueryJob(options);
  console.log(`BigQuery Job: ${job.id} - STARTED`);

  // Wait for the query to finish
  const [rows] = await job.getQueryResults();

  if (([rows][0].length > 2) || ([rows][0].length < 1)) {
    console.log('Invalid number of BigQuery rows. Row count is:', [rows][0].length)
  } else {
     for (const record of [rows][0]) {
      const jsonDcmMetadata = JSON.parse(JSON.stringify(record));
      switch (record['TypeUpdate']) {
        case 'DELETE':
          // TODO: Add DELETE logic
          break;
        case 'CREATE':
          // Extract Patient Matching Demographics
          const lastName = record['PatientName_Alpha']['FamilyName'].split(/[\s^]+/)[0];
          var firstName = '';  
          // console.log('record_PatientName_Alpha_GivenName=', record['PatientName_Alpha']['GivenName'])       
          if (record['PatientName_Alpha']['GivenName'] == null) {
            firstName = record['PatientName_Alpha']['FamilyName'].split(/[\s^]+/)[1];
          } else {
            firstName = record['PatientName_Alpha']['GivenName'];
          }

          // TODO: Refine invalid DOB logic
          // var patientDOB = new Date()
          // if ( jsonDcmMetadata.PatientBirthDate == null ) {
          //   var patientDOB = Date.parse("01/01/1901");
          // } else {
          //   var patientDOB = Date.parse(jsonDcmMetadata.PatientBirthDate);
          // }
          const patientSex = jsonDcmMetadata.PatientSex;
          // console.log('Searching for matches for: ' + lastName + ', ' + firstName + ': DOB=' + patientDOB + ', GENDER=' + patientSex);

          // Search for potential active duplicate patients by matching first name, last name, birthdate, and sex.
          const candidateMatches = await medplum.searchResources('Patient', {
            'family:exact': lastName,
            'given:exact': firstName,
            // birthdate: patientDOB, 
          });
          var patientId:<Patient>;  
          switch (candidateMatches.length) {
            case 0 :  // No patient matches, CREATE Patient
              console.log('No patient match.  Createing patient resource...');
              patientId = await medplum.createResource({
                resourceType: 'Patient',
                "identifier": [
                  {
                    "system": "https://app.poc1.gestaltcloud.com/dicom-store",
                    "value": record['PatientID']
                  },
                  ],
                name: [
                  {
                    given: [firstName],
                    family: lastName,
                  },
                ],
                // birthDate: jsonDcmMetadata.PatientBirthDate,
                // gender: patientSex,
              });
              console.log(`Created Patient: ID=${patientId.id}}`);
              break;
            case 1 :  // Single Patient matches, SELECT patientId
              patientId = candidateMatches[0];
              console.log(`Found 1 Patient match. ID=${patientId.id}`);
              break;
            default:  // More then 1 patient match; patient merge required 
              // TODO: Create patient merge risk assessment and task Q
              console.log(`Found ${candidateMatches.length} matches. Initiate patient merge`);
          }
          // ### Create/Update ImagingStudy / StudyInstanceUID
          const selectImagingStudy = await medplum.searchResources('ImagingStudy', {
            'identifier': `urn:oid:${jsonDcmMetadata.StudyInstanceUID}`
          });     
          switch (selectImagingStudy.length) {
            case 0:  // No Record exists
              console.log('No existing StudyInstanceUID.  Createing resource...');
              const imagingstudy = await medplum.createResource<ImagingStudy>({
                resourceType: 'ImagingStudy', "identifier": [
                  {
                    "system":"urn:dicom:uid",
                    "value": `urn:oid:${jsonDcmMetadata.StudyInstanceUID}`
                  },
                  ],
                "subject": {
                  "reference": `Patient/${patientId.id}`
                },
                status: 'available',
                // started: jsonDcmMetadata.StudyDate,
                "modality": [
                  {
                    "system": "http://dicom.nema.org/resources/ontology/DCM",
                    "code": jsonDcmMetadata.Modality,
                  }
                ],
                "location": {
                  "reference": "Location?identifier=https://app.poc1.gestaltcloud.com/|5ad4469a-3589-1477-9c3a-3e70gd4306d8",
                  "display": "Gestalt Laboratories - Spokane"
                },
                "series": [
                  {
                    "uid": jsonDcmMetadata.SeriesInstanceUID,
                    "number": Number(jsonDcmMetadata.SeriesNumber),
                    "modality": {
                      "system": "http://dicom.nema.org/medical/dicom/current/output/chtml/part16/sect_CID_29.html",
                      "code": jsonDcmMetadata.Modality,
                      // "display": "Slide Microscopy"
                    },
                    "description": String(jsonDcmMetadata.SeriesDescription),
                    "instance": [
                      {
                        "uid": jsonDcmMetadata.SOPInstanceUID,
                        "sopClass": {
                          "system":"urn:dicom:uid",
                          "code": jsonDcmMetadata.SOPCClassUID,
                        },
                        "number": Number(jsonDcmMetadata.InstanceNumber),
                      }
                    ]
                  }
                ]});
              // const imagingstudy = await medplum.createResource<ImagingStudy>({
              //   resourceType: 'ImagingStudy', study_new});
              console.log(`Created ImagingStudy ID=${imagingstudy.id}`);
            break;
            case 1:  // Update Existing Record
              let jsonImagingStudy = JSON.parse(JSON.stringify(selectImagingStudy[0]));
              console.log(`Found 1 ImagingStudy match ID=${jsonImagingStudy.id} Updating ImagingStudy...`);
              jsonImagingStudy.location = {
                "reference": "Location?identifier=https://app.poc1.gestaltcloud.com/|5ad4469a-3589-1477-9c3a-3e70gd4306d8",
                "display": "Gestalt Laboratories - Seattle",
              };
              // Add Value: Study Description
              Object.assign(jsonImagingStudy,{ description: "Adding Study Description"});
              
              const imagingstudy_update = await medplum.updateResource<ImagingStudy>(jsonImagingStudy);
            break;
            default:
              console.log('More then 1 StudyUID exists. Need to merge records')
          }  

          // ### Create/Update SeriesUID ###
          const selectImagingStudySeries = await medplum.searchResources('ImagingStudy', {
            'series:uid': jsonDcmMetadata.SeriesInstanceUID,
          });
          let jsonImagingStudySeries = JSON.parse(JSON.stringify(selectImagingStudySeries));
          
          switch (selectImagingStudySeries.length) {
            case 0:  //No Series Record Exists
              console.log(`No existing ImagingStudy.SeriesInstanceUID found.  Creating SeriesInstanceUID:${jsonDcmMetadata.SeriesInstanceUID}`);
                          
              const series_new = {
                  "uid": jsonDcmMetadata.SeriesInstanceUID,           
                  "number": Number(jsonDcmMetadata.SeriesNumber),
                  "description": String(jsonImagingStudySeries.SeriesDescription),
                  "modality": {
                    "system": "http://dicom.nema.org/medical/dicom/current/output/chtml/part16/sect_CID_29.html",
                    "code": jsonDcmMetadata.Modality,
                    // "display": "Slide Microscopy"
                  },
                  "instance": [
                    {
                      "uid": jsonDcmMetadata.SOPInstanceUID,
                      "sopClass": {
                        "system":"urn:dicom:uid",
                        "code": jsonDcmMetadata.SOPCClassUID,
                      },
                      "number": Number(jsonDcmMetadata.InstanceNumber),
                    }
                  ]
                };
                let jsonImagingStudy = JSON.parse(JSON.stringify(selectImagingStudy[0]));
                // console.log('jsonImagingStudy.series_Before=', JSON.stringify(jsonImagingStudy.series));
                jsonImagingStudy
                  // .flatMap((entry) => entry.series)
                  .series.push(series_new);
                // console.log('jsonImagingStudy.series_After=', JSON.stringify(jsonImagingStudy.series));
                await medplum.updateResource<ImagingStudy>(jsonImagingStudy);
                break;
            case 1:  //Update Series
              console.log(`Found ${selectImagingStudySeries.length} StudySeries match. UID: ${jsonDcmMetadata.SeriesInstanceUID}  Updating Series record.`)
              // console.log('ResourceBefore=', JSON.stringify(jsonImagingStudySeries));
              jsonImagingStudySeries
                .flatMap((entry) => entry.series)
                .find((entry) => entry.uid === jsonDcmMetadata.SeriesInstanceUID)
                .description = String(jsonImagingStudySeries.SeriesDescription)
              await medplum.updateResource<ImagingStudy>(jsonImagingStudySeries[0]); 
              // console.log(`Found ${selectImagingStudySeries.length} Series UID`);
              break;
            default:
              console.log('More then 1 StudySeriesUID selected')
          }

          // #### Create/Update InstanceUID
          const selectImagingStudySeriesInstance = await medplum.searchResources('ImagingStudy', {
            'instance:uid': jsonDcmMetadata.SOPInstanceUID,
          });
          switch (selectImagingStudySeriesInstance.length) {
            case 0:  //No Instance Record Exists 
              console.log(`No existing ImagingStudy SOPInstanceUID exists.  Createing SOPInstance:${jsonDcmMetadata.SOPInstanceUID}`);
              const instance_new = {
                      "uid": jsonDcmMetadata.SOPInstanceUID,
                      "sopClass": {
                        "system":"urn:dicom:uid",
                        "code": jsonDcmMetadata.SOPCClassUID,
                      },
                      "number": Number(jsonDcmMetadata.InstanceNumber),
                    };
              jsonImagingStudySeries
                .flatMap((entry) => entry.series)
                .find((entry) => entry.uid === jsonDcmMetadata.SeriesInstanceUID)
                .instance.push(instance_new);
              
              // console.log('jsonImagingStudySeriesInstance=', JSON.stringify(jsonImagingStudySeries));
              await medplum.updateResource<ImagingStudy>(jsonImagingStudySeries[0]);
              break;
            case 1:
              console.log(`Found ${selectImagingStudySeriesInstance.length} SOPInstance match. UID: ${jsonDcmMetadata.SOPInstanceUID}  Updating Instance record.`)
      
              let jsonImagingStudySeriesInstance = JSON.parse(JSON.stringify(selectImagingStudySeriesInstance));
              jsonImagingStudySeriesInstance
                .flatMap((entry) => entry.series)
                .find((entry) => entry.uid === jsonDcmMetadata.SeriesInstanceUID)
                .instance.find((entry) => entry.uid === jsonDcmMetadata.SOPInstanceUID)
                .number = Number(jsonDcmMetadata.InstanceNumber);
              await medplum.updateResource<ImagingStudy>(jsonImagingStudySeriesInstance[0]);
              break;
            default:
              console.log('More then 1 instance found');
              break;
          }
          // Break after CREATE/UPDATE Resources
          break;
        default:
          console.log('No matching TypeUpdate')
      }
    };
  }
  // const bits = "Judge Ehud".split(/[\s^]+/)
  // console.log('Bits:', bits[1])
};

// query();

