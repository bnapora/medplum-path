import { Schedule } from '@medplum/fhirtypes';
import { Document, Scheduler, useMedplum } from '@medplum/react';
import { ChatGpt } from '../components/ChatGpt';

export function GetCare(): JSX.Element {
  const medplum = useMedplum();
  const schedule = medplum.searchOne('Schedule').read();

  return (
    <Document width={800}>
      <div>
        <ChatGpt />
      </div>
    </Document>
  );
}
