import { Schedule } from '@medplum/fhirtypes';
import { Document, Scheduler, useMedplum } from '@medplum/react';

export function GetCare(): JSX.Element {
  const medplum = useMedplum();
  const schedule = medplum.searchOne('Schedule').read();

  return (
    <Document width={800}>
      <div>
        <h1>Medical Education - AI Chatbot</h1>
      </div>
    </Document>
  );
}
