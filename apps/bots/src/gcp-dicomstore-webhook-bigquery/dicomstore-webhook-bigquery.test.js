// import { BotEvent, MedplumClient } from '@medplum/core';
const {BigQuery} = require('@google-cloud/bigquery');

const options = {
    keyFilename: '/home/bnapora/development/medplum/medplum-path/bots/functions/gcp-dicomstore-webhook-bigquery/svc_account_key/key_medplum-bot-poc1-pathology_gcp-pathology-poc1-0097c5eb541b.json',
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

async function query() {
// export async function handler(medplum: MedplumClient, event: BotEvent): Promise<any> {
  // const.pubsubmsg=event.input;
  // Sample Pub/Sub message
  const pubsubmsg = 'projects/gcp-pathology-poc1/locations/us-west2/datasets/dicom-pathology/dicomStores/slide-dicom-store/dicomWeb/studies/1.2.276.0.7230010.3.1.2.875770937.1.1701420428.448952/series/1.2.276.0.7230010.3.1.3.875770937.1.1701420428.448953/instances/1.2.276.0.7230010.3.1.4.875770937.1.1701420428.448959'

  const pubsubmsgJSON = convertDelimitedStrToObject(pubsubmsg)
  console.log(pubsubmsgJSON['instances'])

  const query = 
          `SELECT * 
          FROM (SELECT MAX (LastUpdated) max_dt FROM \`gcp-pathology-poc1.dicom_pathology.webhook_slide-dicom-store-metadataView\` 
                GROUP BY DATE(LastUpdated)), 
            \`gcp-pathology-poc1.dicom_pathology.webhook_slide-dicom-store-metadataView\` 
          WHERE LastUpdated=max_dt
            AND StudyInstanceUID='${pubsubmsgJSON['studies']}' 
            AND SeriesInstanceUID = '${pubsubmsgJSON['series']}'
            AND SOPInstanceUID = '${pubsubmsgJSON['instances']}'`
  const options = {
    query: query,
    // Location must match that of the dataset(s) referenced in the query.
    location: 'us-west2',
  };

  // Run the query as a job
  const [job] = await bigquery.createQueryJob(options);
  console.log(`Job ${job.id} started.`);

  // Wait for the query to finish
  const [rows] = await job.getQueryResults();
  console.log([rows][0].length)

  if (([rows][0].length > 2) || ([rows][0].length < 1)) {
    console.log('Invalid number of records. Record count is:', [rows][0].length)
  } else {
    [rows][0].forEach(function (record, index) {
      // console.log('Record # ',record, 'Index # ', index);
      switch (record['TypeUpdate']) {
        case 'DELETE':
          // TODO: Add DELETE logic
          break;
        case 'CREATE':
          console.log('TypeUpdate=CREATE')
          console.log(record)
          break;
        default:
          console.log('No matching TypeUpdate')
      }
    });
  }
};
query();
