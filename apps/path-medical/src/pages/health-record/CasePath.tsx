import { Box, Title } from '@mantine/core';
import { ImagingStudy } from '@medplum/fhirtypes';
import { ResourceTable, useMedplum } from '@medplum/react';
import { useParams } from 'react-router-dom';
import { InfoSection } from '../../components/InfoSection';

export function CasePath(): JSX.Element {
  const medplum = useMedplum();
  const { imagingstudyId = '' } = useParams();
  const imagingstudy: ImagingStudy = medplum.readResource('ImagingStudy', imagingstudyId).read();

  return (
    <Box p="xl">
      <Title order={2} mb="md">
        {imagingstudy.id}
      </Title>
      <InfoSection title="ImagingStudy">
        <ResourceTable value={imagingstudy} ignoreMissingValues />
      </InfoSection>
    </Box>
  );
}
