import { useState } from 'react';
import { Anchor, Box, Stack, Text, Title, useMantineTheme } from '@mantine/core';
import { Drawer, Button, Group } from '@mantine/core';
import { Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { formatCodeableConcept, formatDate, getReferenceString } from '@medplum/core';

import { Practitioner, Patient, ImagingStudy } from '@medplum/fhirtypes';
import { StatusBadge, useMedplum, CodeableConceptDisplay } from '@medplum/react';
import { IconCalendar, IconMapPin, IconReportMedical, IconPolaroid } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { InfoButton, InfoSection, SoapNote, QuestionnairePathReport } from '../../components';
import PillsImage from '../../img/pills.svg';


export function CasesPath(): JSX.Element {
  const medplum = useMedplum();
  const [selectedImagingStudy, setImagingStudyId] = useState<string>();
  const patient = medplum.getProfile() as Practitioner;
  const imagingstudies = medplum.searchResources('ImagingStudy', {_filter: 'modality ne "US"', _sort: '-started'}).read();
  // const imagingstudies = medplum.searchResources('ImagingStudy', {_sort: '-started'}).read();
  const today = new Date().toISOString();
  const [opened, { open, close }] = useDisclosure(false, {
    onOpen: () => {console.log('Opened')},
    onClose: () => console.log('Closed'),
  });

  return (
    <Box p="xl">
      <Title mb="lg">My Worklist</Title>
      <Drawer position="right" opened={opened} onClose={close} title="Report Panel" size={'600px'}>
        <QuestionnairePathReport imagingstudyId={selectedImagingStudy} />
      </Drawer>
      <Table>
        <thead>
          <tr>
            <th>Images</th>
            <th>Modality</th>
            <th>Procedure Code</th>
            <th>Status</th>
            <th><IconMapPin size={16} style={{ marginRight: 4 }} />Location</th>
            <th>Slides</th>
            <th><IconCalendar size={16} style={{ marginRight: 4 }} />Available Date</th>
            <th>Report</th>
          </tr>
        </thead>
        <tbody>
          {imagingstudies.map((imagingstudy) => (
            <tr key={imagingstudy.id}>
              <td>
                
                <Anchor 
                  target='_child'
                  // href={`http://localhost:3000/microscopy?StudyInstanceUIDs=${imagingstudy.identifier[0].value?.substring(9)}`}
                  // href={`http://localhost:3000/viewer?StudyInstanceUIDs=1.2.826.0.1.3680043.8.274.1.1.296485632.14350.1699696091.334464`}   
                  href={`https://azvm-mlops-b8.westus2.cloudapp.azure.com/annotations/234/`}             
                >
                  <IconPolaroid size={30} style={{ marginRight: 1 }} />
                </Anchor>
                
              </td>
              <td>
                {imagingstudy.series[0].modality?.display}
              </td>
              <td>{imagingstudy.procedureCode[0].coding[0].display}</td>
              <td>
                <StatusBadge status={imagingstudy.status as string} />
              </td>
              <td>
                {imagingstudy.location?.display}
              </td>
              <td>
                {imagingstudy.numberOfSeries}
              </td>
              <td>
                {formatDate(imagingstudy.meta?.lastUpdated)}
              </td>
              <td>
                {/* <Button onClick={open}>Report</Button> */}
                <Button onClick={() => {
                    open()
                    setImagingStudyId(imagingstudy.id?.toString())
                  }}
                >
                  <IconReportMedical size={24} style={{ marginRight: 1 }} />
                </Button> 
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Box>
  );
}

