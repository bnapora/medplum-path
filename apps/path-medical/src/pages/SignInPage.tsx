import { BackgroundImage, Box, SimpleGrid } from '@mantine/core';
import { SignInForm } from '@medplum/react';
import { useNavigate } from 'react-router-dom';
import PathologistProfessionals1 from '../../src/img/landingPage/Pathologist-Professional-2273w.png'
import { MEDPLUM_GOOGLE_CLIENT_ID, MEDPLUM_PROJECT_ID } from '../config';

export function SignInPage(): JSX.Element {
  const navigate = useNavigate();
  return (
    <SimpleGrid cols={2}>
      <Box pt={100} pb={200}>
        <SignInForm
          projectId={MEDPLUM_PROJECT_ID}
          googleClientId={MEDPLUM_GOOGLE_CLIENT_ID}
          onSuccess={() => navigate('/')}
        >
          <h2>Sign in to Gestalt PathCloud</h2>
        </SignInForm>
      </Box>
      {/* <BackgroundImage src="../../src/img/landingPage/Pathologist-Professional-2273w.png" /> */}
      {/* <BackgroundImage src="../../src/img/landingPage/gestalt++digital+pathology+background-2273w.png" /> */}
      <BackgroundImage src="../../src/img/landingPage/laboratories+and+testing-1920w.jpg" />
    </SimpleGrid>
  );
}
